import { Action } from '@ngrx/store';

export const ADD_MESSAGE = 'ADD_MESSAGE';

export class AddMessage implements Action {
    readonly type = ADD_MESSAGE;
    payload;
}

export type ChatActions = AddMessage;