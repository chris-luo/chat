import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {}

    signup(user: {username: string, email: string, password: string}) {
        return this.http.post('http://localhost:3000/users/signup', user)
    }
}