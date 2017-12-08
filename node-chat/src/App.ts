import * as express from "express";
import { Request, Response } from "express";
import * as config from "config";
import * as http from "http";
import * as logger from "morgan";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as passport from 'passport';

import { ChatSocket } from "./controllers/ChatSocket";
import UserRouter from "./routes/UserRouter";
import ResourceRouter from "./routes/ResourceRouter";
import {Passport} from './controllers/Passport';

export class App {
    public express: any;
    private server: any;
    private port: number;

    constructor() {
        this.express = express();
        this.port = +config.get('PORT');
        this.createServer();
        this.middleware();
        this.mountRoutes();
        this.listen();
    }

    private createServer(): void {
        this.server = http.createServer(this.express);
    }

    private middleware(): void {
        passport.use(new Passport().getStrategy());
        this.express.use(passport.initialize());
        this.express.use(logger('dev'));
        this.express.use(cors());
        this.express.use(bodyParser.json());
    }

    private mountRoutes(): void {
        this.express.use('/users', UserRouter);
        this.express.use('/resources', ResourceRouter);
        this.express.get('*', (req: Request, res: Response) => {
            res.sendFile(path.join(__dirname, '../views/index.html'));
        });
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        new ChatSocket(this.server);
    }
}