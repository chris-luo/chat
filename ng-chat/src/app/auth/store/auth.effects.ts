import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions} from '@ngrx/effects';

import * as AuthActions from './auth.actions';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
// import 'rxjs/add/operator/map';
@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$
        .ofType(AuthActions.TRY_SIGNUP)
        .pipe(
            map((action: AuthActions.TrySignup) => {
                return action.payload;
            }),
            switchMap((user: {username: string, email: string, password: string}) => {
                return this.authService.signup(user)
            }),
            mergeMap((res) => {
                this.router.navigate(['/chat']);
                return [
                    {
                        type: AuthActions.SIGNUP
                    },
                    {
                        type: AuthActions.SET_TOKEN,
                        payload: res['data']
                    }
                ]
            })
        );

    @Effect()
    authSignin = this.actions$
        .ofType(AuthActions.TRY_SIGNIN)
        .pipe(
            map((action: AuthActions.TrySignup) => {
                return action.payload;
            }),
            switchMap((user: {email: string, password: string}) => {
                return this.authService.signIn(user)
            }),
            mergeMap((res) => {
                this.router.navigate(['/chat']);
                return [
                    {
                        type: AuthActions.SIGNIN
                    },
                    {
                        type: AuthActions.SET_TOKEN,
                        payload: res['data']
                    }
                ]
            })
        );

    constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}
}