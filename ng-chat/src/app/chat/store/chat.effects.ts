import { Injectable } from '@angular/core';
import { Effect, Actions} from '@ngrx/effects';
import * as ChatActions from './chat.actions';
import { map, switchMap, catchError, mergeMap, tap } from 'rxjs/operators';
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
import { environment } from '../../../environments/environment';
import * as io from 'socket.io-client';

@Injectable()
export class ChatEffects {
    private user: User;
    private url = environment.apiEndPoint;
    private socket;

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
                    map((res:any) => {
                        return {
                                type: ChatActions.NEW_CHAT,
                                payload: res.data
                                }
                    }),
                    catchError((error: HttpErrorResponse) => {
                        this.snackBar.open(error.error, 'X', {duration: 3000});
                        return Observable.of({
                            type: ChatActions.CHAT_ERROR
                        });
                    })
                )
        })
    );

    @Effect()
    getChats = this.actions$.
    ofType(ChatActions.GET_CHATS)
    .pipe(
        map((action: ChatActions.GetChats) => {
            return;
        }),
        switchMap(() => {
            return this.apiService.getChats()
                .pipe(
                    map((res:any) => {
                        return {
                            type: ChatActions.SET_CHATS,
                            payload: res.data
                        }
                    }),
                    catchError((error: HttpErrorResponse) => {
                        this.snackBar.open(error.error, 'X', {duration: 3000});
                        return Observable.of({
                            type: ChatActions.CHAT_ERROR
                        });
                    })
                )
        })
    )

    @Effect({dispatch: false})
    joinRoom = this.actions$.
    ofType(ChatActions.JOIN_ROOM)
    .pipe(
        map((action: ChatActions.JoinRoom) => {
            return action.payload;
        }),
        tap((id: string) => {
            console.log(id);
            this.socket.emit('join', id);
        })
    )

    constructor(
        private actions$: Actions, 
        private apiService: ApiService, 
        private store: Store<fromChat.FeatureState>,
        private snackBar: MatSnackBar) {
        this.store.select('auth').subscribe((authState: fromAuth.State) => {
            this.user = authState.user;
        });
        this.connect();
    }

    private connect() {
        console.log('connecting')
        this.socket = io(this.url);
    }
}