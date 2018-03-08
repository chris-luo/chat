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
        case ChatActions.SET_CHATS:
            return {
                ...state,
                chats: action.payload
            }
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
        case ChatActions.SET_CHAT_MESSAGES:
            const chat2 = state.chats[state.currentChat];
            const updatedChat2 = {
                ...chat2,
                messages: [...action.payload.messages, ...chat2.messages]
            }
            const oldChats2 = [...state.chats];
            oldChats2[state.currentChat] = updatedChat2;
            return {
                ...state,
                chats: oldChats2,
            }
        case ChatActions.SET_CURRENT_CHAT:
            return {
                ...state,
                currentChat: action.payload
            }
        case ChatActions.NEW_CHAT:
            //New chat gets added to the start of the array
            //Return current chat as 0 the new added chat
            return {
                ...state,
                chats: [action.payload, ...state.chats],
                currentChat: 0
            }
        default:
            return state;
    }
}