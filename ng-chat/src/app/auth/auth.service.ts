import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
    private ep: string = "http://localhost:3000/users";
    private token: string;
    private user: { id: number, email: string, username: string};

    constructor(private http: HttpClient, private router: Router) {}

    signup(user: {username: string, email: string, password: string}) {
        return this.http.post(`${this.ep}/signup`, user);
    }

    signIn(user: {email: string, password: string}) {
        return this.http.post(`${this.ep}/signin`, user);
    }
    
    getToken() {
        return this.token;
    }

    getUser() {
        return this.user;
    }

    setToken(token: string) {
        const jwtHelper: JwtHelper = new JwtHelper();
        const decoded = jwtHelper.decodeToken(token);
        const user = {
            id: +decoded.id,
            email: decoded.email,
            username: decoded.username
        }
        this.token = token;
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
    }

    initializeFromLocalStorage() {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        if (token === null || user === null) {
            this.nullAndClear();
            return;
        }
        this.token = token;
        this.user = user;
    }

    loggedIn() {
        // const jwtHelper: JwtHelperService = new JwtHelperService({});
        // console.log(jwtHelper.isTokenExpired(this.token));
        // return jwtHelper.isTokenExpired(this.token);
        return tokenNotExpired();
    }
    
    nullAndClear() {
        this.token = null;
        this.user = null;
        localStorage.clear();
    }

    logout() {
        this.nullAndClear();
        this.router.navigate(['/signin']);
    }
}