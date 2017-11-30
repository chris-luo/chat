import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
    private ep: string = `${environment.apiEndPoint}/users`;
    private token: string;
    private user: { id: number, email: string, username: string};

    constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) {}

    signup(user: {username: string, email: string, password: string}) {
        return this.http.post(`${this.ep}/signup`, user);
    }

    signIn(user: {email: string, password: string}) {
        return this.http.post(`${this.ep}/signin`, user);
    }
    
    // getToken() {
    //     return this.token;
    // }

    getUser() {
        return this.user;
    }

    // setToken(token: string) {
    //     const jwtHelper: JwtHelper = new JwtHelper();
    //     const decoded = jwtHelper.decodeToken(token);
    //     const user = {
    //         id: +decoded.id,
    //         email: decoded.email,
    //         username: decoded.username
    //     }
    //     this.token = token;
    //     this.user = user;
    //     localStorage.setItem('user', JSON.stringify(user));
    //     localStorage.setItem('token', token);
    // }

    initializeFromLocalStorage() {
        const token = localStorage.getItem('token');
        if (token === null) {
            return;
        }
        const jwtHelper: JwtHelper = new JwtHelper();
        const decoded = jwtHelper.decodeToken(token);
        const user = {
            id: +decoded.id,
            email: decoded.email,
            username: decoded.username
        }
        // if (token === null || user === null) {
        //     this.nullAndClear();
        //     return;
        // }
        if (tokenNotExpired()) {
            this.store.dispatch(new AuthActions.Signin());
            this.store.dispatch(new AuthActions.SetToken({token: token, user: user}));
        } else {
            localStorage.clear();
        }
    }

    // loggedIn() {
    //     return tokenNotExpired();
    // }
    
    // nullAndClear() {
    //     this.token = null;
    //     this.user = null;
    //     localStorage.clear();
    // }

    logout() {
        // this.nullAndClear();
        this.store.dispatch(new AuthActions.Logout());
        localStorage.clear();
        this.router.navigate(['/signin']);
    }
}
