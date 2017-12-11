import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {
    private apiEndPoint: string = environment.apiEndPoint;
    constructor(private http: HttpClient) {}

    findUser(user: string) {
        const params = new HttpParams().set('user', user);
        return this.http.get(`${this.apiEndPoint}/resources/user`, {params: params});
    }

    newChat(chat: {user: string, message: string}) {
        return this.http.post(`${this.apiEndPoint}/users/chat`, chat);
    }

    getChats() {
        return this.http.get(`${this.apiEndPoint}/users/chats`);
    }
}