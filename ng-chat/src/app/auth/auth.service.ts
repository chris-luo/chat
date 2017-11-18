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

    setToken(token: string) {
        const jwtHelper: JwtHelper = new JwtHelper();
        const decoded = jwtHelper.decodeToken(token);
        const user = {
            id: decoded.id,
            email: decoded.email,
            username: decoded.username
        }
        this.token = token;
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
    }

    loggedIn() {
        // const jwtHelper: JwtHelperService = new JwtHelperService({});
        // console.log(jwtHelper.isTokenExpired(this.token));
        // return jwtHelper.isTokenExpired(this.token);
        return tokenNotExpired();
    }

    logout() {
        this.token = null;
        localStorage.clear();
        this.router.navigate(['']);
    }
}