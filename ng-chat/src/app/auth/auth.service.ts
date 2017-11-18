import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
    private ep: string = "http://localhost:3000/users";
    private token: string;

    constructor(private http: HttpClient) {}

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
        this.token = token;
        const jwtHelper: JwtHelperService = new JwtHelperService({});
        const decoded = jwtHelper.decodeToken(token);
        const user = {
            id: decoded.id,
            email: decoded.email,
            username: decoded.username
        }
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
    }

    tokenNotExpired() {
        const jwtHelper: JwtHelperService = new JwtHelperService({});
        console.log(jwtHelper.isTokenExpired(this.token));
    }

    logout() {
        this.token = null;
        localStorage.clear();
    }
}