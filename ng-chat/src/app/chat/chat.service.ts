import { OnInit, Injectable } from "@angular/core";
import * as ChatActions from './store/chat.actions';
import { Store } from "@ngrx/store";
import { Message } from "./message.model";
import * as fromChat from './store/chat.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import { take } from "rxjs/operators";
import * as format from 'date-fns/format';

@Injectable()
export class ChatService {
    private user: {id: number, username: string, email: string};
    private currentChat;

    constructor(private store: Store<fromChat.FeatureState>) {
        this.store.select('auth')
            .pipe(
                take(1)
            )
            .subscribe((authState: fromAuth.State) => {
                this.user = authState.user
            });

            this.store.select('chat')

            .subscribe((chatState: fromChat.State) => {
                this.currentChat = chatState.chats[chatState.currentChat];
            });
    }

    sendMessage(message: string) {
        this.store.dispatch(new ChatActions.TryAddMessage({
            message: new Message(null, message, this.user.username, format(new Date())), 
            id: this.currentChat.id}));
    }
}
