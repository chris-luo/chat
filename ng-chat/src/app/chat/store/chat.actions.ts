import { Action } from '@ngrx/store';
import { Message } from '../message.model';
import { Chat } from '../chat.model';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const TRY_ADD_MESSAGE = 'TRY_ADD_MESSAGE';
export const SET_CURRENT_CHAT = 'SET_CURRENT_CHAT';
export const NEW_CHAT = 'NEW_CHAT';
export const TRY_NEW_CHAT = 'TRY_NEW_CHAT';
export const GET_CHATS = 'GET_CHATS';
export const SET_CHATS = 'SET_CHATS';
export const GET_CHAT_MESSAGES = 'GET_CHAT_MESSAGES';
export const SET_CHAT_MESSAGES = 'SET_CHAT_MESSAGES';
export const CHAT_ERROR = 'CHAT_ERROR';
export const JOIN_ROOM = 'JOIN_ROOM';

export class AddMessage implements Action {
    readonly type = ADD_MESSAGE;
    constructor(public payload: Message) {}
}

export class TryAddMessage implements Action {
    readonly type = TRY_ADD_MESSAGE;
    constructor(public payload: {message: Message, id: string}) {}
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

export class GetChats implements Action {
    readonly type = GET_CHATS;
}

export class SetChats implements Action {
    readonly type = SET_CHATS;
    constructor(public payload: Chat) {}
}

export class GetChatMessages implements Action {
    readonly type = GET_CHAT_MESSAGES;
    constructor(public payload: {chat_id: number, message_id: number}) {}
}

export class SetChatMessages implements Action {
    readonly type = SET_CHAT_MESSAGES
    constructor(public payload: {chat_id: number, messages: Message[]}) {}
}

export class ChatError implements Action {
    readonly type = CHAT_ERROR;
}

export class JoinRoom implements Action {
    readonly type = JOIN_ROOM;
    constructor(public payload: string) {}
}

export type ChatActions = 
AddMessage | 
SetCurrentChat | 
NewChat | 
TryNewChat | 
GetChats | 
SetChats |
GetChatMessages |
SetChatMessages |
ChatError | 
JoinRoom | 
TryAddMessage;