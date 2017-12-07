import { Action } from '@ngrx/store';
import { Message } from '../message.model';
import { Chat } from '../chat.model';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SET_CURRENT_CHAT = 'SET_CURRENT_CHAT';
export const NEW_CHAT = 'NEW_CHAT';
export const TRY_NEW_CHAT = 'TRY_NEW_CHAT';

export class AddMessage implements Action {
    readonly type = ADD_MESSAGE;
    constructor(public payload: Message) {}
}

export class SetCurrentChat implements Action {
    readonly type = SET_CURRENT_CHAT;
    constructor(public payload: number) {}
}

export class NewChat implements Action {
    readonly type = NEW_CHAT;
    constructor(public payload: Chat) {}
}

export class TryNewChat implements Action {
    readonly type = TRY_NEW_CHAT;
    constructor(public payload: {user: string, message: string}) {}
}

export type ChatActions = AddMessage | SetCurrentChat | NewChat | TryNewChat;