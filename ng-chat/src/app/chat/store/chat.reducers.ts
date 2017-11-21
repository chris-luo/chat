import * as ChatActions from './chat.actions';
import { Message } from '../message.model';

export interface FeatureState {
    chat: State
}

export interface State {
    messages: Message[];
}

const initialState: State = {
    messages: []
}

export function chatReducer(state = initialState, action: ChatActions.ChatActions) {
    switch (action.type) {
        case ChatActions.ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        default:
            return state;
    }
}