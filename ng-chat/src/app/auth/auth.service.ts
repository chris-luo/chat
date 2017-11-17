import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
    private ep: string = "http://localhost:3000/users";

    constructor(private http: HttpClient) {}

    signup(user: {username: string, email: string, password: string}) {
        return this.http.post(`${this.ep}/signup`, user);
    }

    signin(user: {email: string, password: string}) {
        return this.http.post(`${this.ep}/signin`, user);
    }
}