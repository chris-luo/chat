import * as ChatActions from './chat.actions';

const initialState = {
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