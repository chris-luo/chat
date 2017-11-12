import * as socketIo from "socket.io";

export class ChatSocket {
    private io: SocketIO.Server;
    constructor(private server: any) {
        this.io = socketIo(this.server);
        this.listen();
    }

    private listen() {
        this.io.on('connect', (socket: SocketIO.Socket) => {
            console.log('a user connected');
            socket.on('post', (data:any) => {
                console.log(data);
                socket.broadcast.emit('message', data);
            });
            socket.on('disconnect', () => {
                console.log('disconnected');
            })
        });
    }
}