import * as ChatActions from './chat.actions';
import { Message } from '../message.model';
import * as fromApp from '../../store/app.reducers';
import { Chat } from '../chat.model';

export interface FeatureState extends fromApp.AppState {
    chat: State
}

export interface State {
    chats: Chat[];
    currentChat: number;
}

const initialState: State = {
    chats: [],
    currentChat: null
}

export function chatReducer(state = initialState, action: ChatActions.ChatActions) {
    switch (action.type) {
        case ChatActions.ADD_MESSAGE:
            const chat = state.chats[state.currentChat];
            const updatedChat = {
                ...chat,
                messages: [...chat.messages, action.payload]
            }
            const oldChats = [...state.chats];
            oldChats.splice(state.currentChat, 1);
            const chats = [updatedChat, ...oldChats];
            return {
                ...state,
                chats: chats,
                currentChat: 0
            }
        case ChatActions.SET_CURRENT_CHAT:
            return {
                ...state,
                currentChat: action.payload
            }
        default:
            return state;
    }
}