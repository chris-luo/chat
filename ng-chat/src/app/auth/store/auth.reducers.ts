import * as AuthActions from './auth.actions';
import { User } from '../../shared/user.model';

export interface State {
    token: string;
    authenticated: boolean;
    user: User;
    error: boolean;
    message: string;
}

const initialState: State = {
    token: null,
    authenticated: false,
    user: null,
    error: false,
    message: null
}

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch(action.type) {
        case AuthActions.SIGNUP:
        case AuthActions.SIGNIN:
            return {
                ...state,
                authenticated: true
            };
        case AuthActions.AUTH_FAILED:
            return {
                ...state,
                error: true,
                message: action.payload.error
            }
        case AuthActions.RESET_ERROR:
            return {
                ...state,
                error: false,
                message: null
            }
        case AuthActions.LOGOUT:
            return {
                ...state,
                token: null,
                authenticated: false,
                user: null
            }
        case AuthActions.SET_TOKEN:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user
            }
        default:
            return state;
    }
}