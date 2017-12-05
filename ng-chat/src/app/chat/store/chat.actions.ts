import { Action } from '@ngrx/store';
import { Message } from '../message.model';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SET_CURRENT_CHAT = 'SET_CURRENT_CHAT';

export class AddMessage implements Action {
    readonly type = ADD_MESSAGE;
    constructor(public payload: Message) {}
}

export class SetCurrentChat implements Action {
    readonly type = SET_CURRENT_CHAT;
    constructor(public payload: number) {}
}

export type ChatActions = AddMessage | SetCurrentChat;