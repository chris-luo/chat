import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions} from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map, mergeMap, switchMap, catchError } from 'rxjs/operators';
import 'rxjs/add/observable/of';

import { AuthService } from '../auth.service';
import * as AuthActions from './auth.actions';

// import { of } from 'rxjs/observable/of';
// import { map } from 'rxjs/operators/map';
// import { switchMap } from 'rxjs/operators/switchMap';
// import { mergeMap } from 'rxjs/operators/mergeMap';
// import { catchError } from 'rxjs/operators/catchError';

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
                    .pipe(
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
                        }),
                        catchError((error: HttpErrorResponse) => {
                            return Observable.of({ type: AuthActions.AUTH_FAILED, payload: error });
                        })
                    );
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
                .pipe(
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
                    }),
                    catchError((error: HttpErrorResponse) => {
                        return Observable.of({ type: AuthActions.AUTH_FAILED, payload: error });
                    })
                );
            })
        );

    constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}
}