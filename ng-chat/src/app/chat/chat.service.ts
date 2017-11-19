import { OnInit, Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import * as io from 'socket.io-client';
import { AuthService } from "../auth/auth.service";

@Injectable()
export class ChatService {
    private url = 'http://localhost:3000';
    private socket;

    private user: {id: number, username: string, email: string};

    public newMessage: Subject<any> = new Subject<any>();

    constructor(private authService: AuthService) {
        this.connect();
        this.user = this.authService.getUser();
    }

    private connect() {
        this.socket = io(this.url);
        this.socket.on('message', (data: {message: string, user: {id: number, email: string, username: string}}) => {
            this.newMessageEmitter(data);
        });
    }

    private newMessageEmitter(data: {message: string, user: {id: number, email: string, username: string}}) {
        data['style'] = 'right';
        if (this.user.username !== data.user.username) {
            data['style'] = 'left';
        };
        this.newMessage.next(data);
    }

    disconnect() {
        this.socket.disconnect();
    }

    sendMessage(message: string) {
        this.newMessageEmitter({user: this.user, message: message});
        this.socket.emit('post', {user: this.user, message: message});
    }
}