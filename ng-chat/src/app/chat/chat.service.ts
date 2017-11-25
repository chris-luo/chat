import { OnInit, Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import { AuthService } from "../auth/auth.service";
import * as ChatActions from './store/chat.actions';
import { Store } from "@ngrx/store";
import { Message } from "./message.model";
import * as fromChat from './store/chat.reducers';
import { environment } from '../../environments/environment';

@Injectable()
export class ChatService {
    private url = environment.apiEndPoint;
    private socket;

    private user: {id: number, username: string, email: string};

    constructor(private authService: AuthService, private store: Store<fromChat.FeatureState>) {
        this.connect();
        this.user = this.authService.getUser();
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
        this.messageDispatcher(new Message(this.user, {text: message, float: 'right'}));
        this.socket.emit('post', new Message(this.user, {text: message, float: 'left'}));
    }
}
