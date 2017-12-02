import * as ChatActions from './chat.actions';
import { Message } from '../message.model';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
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