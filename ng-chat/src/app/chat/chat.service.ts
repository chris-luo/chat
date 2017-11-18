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
        this.socket.on('message', (data: string) => {
            this.newMessage.next(data)
        });
    }

    disconnect() {
        this.socket.disconnect();
    }

    sendMessage(message: string) {
        this.newMessage.next({user: this.user, message: message})      
        this.socket.emit('post', {user: this.user, message: message});
    }
}