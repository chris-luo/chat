import { OnInit, Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import { AuthService } from "../auth/auth.service";
import * as ChatActions from './store/chat.actions';
import { Store } from "@ngrx/store";
import { Message } from "./message.model";
import * as fromChat from './store/chat.reducers';
import { environment } from '../../environments/environment';
import * as fromAuth from '../auth/store/auth.reducers';
import { take } from "rxjs/operators";
import * as format from 'date-fns/format';

@Injectable()
export class ChatService {
    private url = environment.apiEndPoint;
    private socket;

    private user: {id: number, username: string, email: string};

    constructor(private authService: AuthService, private store: Store<fromChat.FeatureState>) {
        // this.connect();
        this.store.select('auth')
            .pipe(
                take(1)
            )
            .subscribe((authState: fromAuth.State) => {
                this.user = authState.user
            });
    }

    private connect() {
        this.socket = io(this.url);
        this.socket.on('message', (data: Message) => {
            this.messageDispatcher(data);
        });
    }

    private messageDispatcher(data: Message) {
        this.store.dispatch(new ChatActions.AddMessage(data));
    }

    disconnect() {
        this.socket.disconnect();
    }

    sendMessage(message: string) {
        // this.messageDispatcher(new Message(this.user, {text: message, float: 'right', dateTime: format(new Date())}));
        // this.socket.emit('post', new Message(this.user, {text: message, float: 'left', dateTime: format(new Date())}));
        this.messageDispatcher(new Message('0', message, this.user.username, format(new Date())));
        this.socket.emit('post', new Message('0', message, this.user.username, format(new Date())));
    }
}
