import * as socketIo from "socket.io";
import db from "../controllers/Database";
import { QueryConfig } from "pg";

export class ChatSocket {
    private io: SocketIO.Server;
    constructor(private server: any) {
        this.io = socketIo(this.server);
        this.listen();
    }

    private listen() {
        this.io.on('connect', (socket: SocketIO.Socket) => {
            console.log('a user connected');
            socket.on('join', (room: string) => {
                console.log(room);
                socket.join(room);
            });
            socket.on('post', (data:any) => {
                console.log(data);
                (async() => {
                    const client = await db.getClient();
                    try {
                        await client.query('BEGIN');
                        const queryConfig: QueryConfig = {
                            text: `INSERT INTO chat(id, total_messages) VALUES($1, 1) ON CONFLICT (id) DO UPDATE SET total_messages = chat.total_messages + 1 RETURNING *`,
                            values: [data.id]
                        }
                        const rows = await client.query(queryConfig);
                        console.log(rows.rows);
                        const queryConfig2: QueryConfig = {
                            text: `INSERT INTO message(id, content, sender) VALUES($1, $2, $3) RETURNING *`,
                            values: [`${rows.rows[0].id}:${rows.rows[0].total_messages}`, data.message.content, data.message.sender]
                        };
                        const rows2 = await client.query(queryConfig2);
                        console.log(rows2.rows)
                        await client.query('COMMIT');
                        const message = rows2.rows[0];
                        this.io.in(rows.rows[0].id).emit('message', message);
                    } catch (error) {
                        await client.query('ROLLBACK');
                        socket.emit('db_error', {message: 'Please try again later.'});
                    } finally {
                        client.release();
                    }
                })().catch(error => {
                    socket.emit('db_error', {message: 'Please try again later.'});
                });
            });
            socket.on('disconnect', () => {
                console.log('disconnected');
            })
        });
    }
}