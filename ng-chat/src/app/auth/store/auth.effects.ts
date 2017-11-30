import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions} from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';

import { Observable } from 'rxjs/Observable';
import { map, mergeMap, switchMap, catchError } from 'rxjs/operators';
import 'rxjs/add/observable/of';

import { AuthService } from '../auth.service';
import * as AuthActions from './auth.actions';
import { User } from '../../shared/user.model';

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
                            const token = res['data'];
                            const user = this.extractUser(token);
                            const payload = {
                                token: token,
                                user: user
                            }
                            localStorage.setItem('token', res['data']);
                            this.router.navigate(['/chat']);                            
                            return [
                                {
                                    type: AuthActions.SIGNUP
                                },
                                {
                                    type: AuthActions.SET_TOKEN,
                                    payload: payload
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
                        const token = res['data'];
                        const user = this.extractUser(token);
                        const payload = {
                            token: token,
                            user: user
                        }
                        localStorage.setItem('token', res['data']);
                        this.router.navigate(['/chat']);                        
                        return [
                            {
                                type: AuthActions.SIGNIN
                            },
                            {
                                type: AuthActions.SET_TOKEN,
                                payload: payload
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

    private extractUser(token: string): User {
        const jwtHelper: JwtHelper = new JwtHelper();
        const decoded = jwtHelper.decodeToken(token);
        const user = {
            id: +decoded.id,
            email: decoded.email,
            username: decoded.username
        }
        return user;
    }
}