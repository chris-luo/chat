import { Injectable } from '@angular/core';
import { Effect, Actions} from '@ngrx/effects';
import * as ChatActions from './chat.actions';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { ApiService } from '../../shared/api.service';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';
import { Chat } from '../chat.model';
import { Message } from '../message.model';
import * as format from 'date-fns/format';
import { Store } from '@ngrx/store';
import * as fromChat from './chat.reducers';
import * as fromAuth from '../../auth/store/auth.reducers'
import { User } from '../../shared/user.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class ChatEffects {
    private user: User;

    @Effect()
    chatNewChat = this.actions$
    .ofType(ChatActions.TRY_NEW_CHAT)
    .pipe(
        map((action: ChatActions.TryNewChat) => {
            return action.payload;
        }),
        switchMap((chat: {user: string, message: string}) => {
            return this.apiService.newChat(chat)
                .pipe(
                    mergeMap((res:any) => {
                        const newChat: Chat = {
                            id: res.data,
                            users: res.data.split(':'),
                            messages: []
                        }
                        const message = new Message(this.user, {text: chat.message, float: 'right', dateTime: format(new Date())})
                        return [{
                                type: ChatActions.NEW_CHAT,
                                payload: newChat
                                },
                                {
                                    type: ChatActions.ADD_MESSAGE,
                                    payload: message
                                }
                        ]
                        
                    })
                )
        }),
        catchError((error: HttpErrorResponse) => {
            this.snackBar.open(error.error, 'X', {duration: 3000});
            return Observable.of({  });
        })
    );
    constructor(
        private actions$: Actions, 
        private apiService: ApiService, 
        private store: Store<fromChat.FeatureState>,
        private snackBar: MatSnackBar) {
        this.store.select('auth').subscribe((authState: fromAuth.State) => {
            this.user = authState.user;
        });
    }
}