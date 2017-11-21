import { Action } from '@ngrx/store';
import { Message } from '../message.model';

export const ADD_MESSAGE = 'ADD_MESSAGE';

export class AddMessage implements Action {
    readonly type = ADD_MESSAGE;
    constructor(public payload: Message) {}
}

export type ChatActions = AddMessage;