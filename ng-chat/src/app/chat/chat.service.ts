import { Subject } from "rxjs/Subject";
import * as io from 'socket.io-client';
import { OnInit } from "@angular/core";

export class ChatService {
    private url = 'http://localhost:3000';
    private socket;
    public newMessage: Subject<string> = new Subject<string>();

    constructor() {
        this.connect();
    }

    private connect() {
        this.socket = io(this.url);
        this.socket.on('message', (data: string) => {
            this.newMessage.next(data)
        });
    }

    sendMessage(message: string) {
        this.socket.emit('post', message);
    }
}