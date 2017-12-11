import { Router, Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator/check";
import { matchedData, sanitizeBody } from "express-validator/filter";
import db from "../controllers/Database";
import { QueryConfig } from "pg";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as config from "config";
import * as passport from 'passport';

export class UserRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.init();
    }

    private async signup(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.mapped());
        }
        const user = matchedData(req);

        try {
            //Generate hash with brcypt
            const date = Date.now();
            const hash = await bcrypt.hash(user.password, 12);
            console.log('Hash Time', Date.now() - date);

            //Insert user into database
            let queryConfig: QueryConfig = {
                text: `INSERT INTO chat_user(username, email, password) VALUES($1, $2, $3) RETURNING *`,
                values: [user.username, user.email, hash]
            };

            const rows = await db.query(queryConfig);
            const token = jwt.sign(
            {
                id: rows[0].id,
                username: rows[0].username,
                email: rows[0].email
            }, 
            config.get('SECRET'), 
            { expiresIn: config.get('TOKEN_EXPIRATION_TIME')});
            res.json({
                message: "Account created",
                data: token
            });
        } catch (error) {
            return res.status(500).json(error.code);
        }
    }

    private signupValidation() {
        return [
            check('username').exists(),
            check('email').isEmail().trim().normalizeEmail(),
            check('password').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
        ]
    }

    private async signin(req: Request, res: Response, next: NextFunction) {
        const queryConfig: QueryConfig = {
            text: `SELECT * FROM chat_user WHERE email=$1`,
            values: [req.body.email]
        };
        try {
            const rows = await db.query(queryConfig);
            if (rows.length === 0) {
                //No user exists
                return res.status(401).json('Wrong email or password.');
            }
            const date = Date.now();
            const match = await bcrypt.compare(req.body.password, rows[0].password);
            console.log('Hash Time', Date.now() - date);

            if (!match) {
                return res.status(401).json('Wrong email or password.');
            }
            //User authenticated create jwt and send
            const user = {
                id: rows[0].id,
                username: rows[0].username,
                email: rows[0].email
            }
            const token = jwt.sign(user, config.get('SECRET'), { expiresIn: config.get('TOKEN_EXPIRATION_TIME')});
            res.json({
                message: "Success!",
                data: token
            });
        }
        catch (error) {
            res.status(500).json(error.code);
        }
    }

    private async newChat(req: Request, res: Response, next: NextFunction) {
        try {
            let queryConfig: QueryConfig = {
                text: `SELECT id, username, email FROM chat_user WHERE email=$1 or username=$1`,
                values: [req.body.user]
            };
            const rows = await db.query(queryConfig);
            if (rows.length === 0) {
                return res.status(409).json(`User ${req.body.user} does not exist.`);
            }

            const client = await db.getClient();
            try {
                await client.query('BEGIN');
                const queryConfig2: QueryConfig = {
                    text: `INSERT INTO chat(id, total_messages) VALUES($1, 1) ON CONFLICT (id) DO UPDATE SET total_messages = chat.total_messages + 1 RETURNING *`,
                    values: [`${req.user.username}:${rows[0].username}`]
                };
                const rows2 = await client.query(queryConfig2);
                const queryConfig3: QueryConfig = {
                    text: `INSERT INTO message(id, content, sender) VALUES($1, $2, $3) RETURNING *`,
                    values: [`${rows2.rows[0].id}:${rows2.rows[0].total_messages}`, req.body.message, req.user.username]
                };
                const rows3 = await client.query(queryConfig3);
                await client.query('COMMIT');
                const newChat = {
                    id: rows2.rows[0].id,
                    users: rows2.rows[0].id.split(':'),
                    messages: rows3.rows
                }
                return res.json({
                    message: "Success",
                    data: newChat
                });
            } catch (error) {
                await client.query('ROLLBACK');
                return res.status(500).json(error.code);
            } finally {
                client.release();
            }

        } catch (error) {
            return res.status(500).json(error.code);
        }
    }

    private async getChats(req: Request, res: Response, next: NextFunction) {
        try {
            const queryConfig: QueryConfig = {
                text: `SELECT * FROM chat WHERE id LIKE $1`,
                values: [`%${req.user.username}%`]
            }
            const rows = await db.query(queryConfig);
            let chats:any[] = [];
            for (let row of rows) {
                let queryConfig: QueryConfig = {
                    text: `SELECT * FROM message WHERE id=$1`,
                    values: [`${row.id}:${row.total_messages}`]
                }
                row.messages = await db.query(queryConfig);
                row.users = row.id.split(':');
                chats = [...chats, row]
            }
            res.json({
                data: chats
            });
        } catch (error) {
            return res.status(500).json(error.code);
        }
    }

    private signinSanitization() {
        return sanitizeBody('email').trim().normalizeEmail();
    }

    private init() {
        this.router.post('/signup', this.signupValidation(), this.signup);
        this.router.post('/signin', this.signinSanitization(), this.signin);
        this.router.post('/chat', passport.authenticate('jwt', { session: false }), this.newChat);  //TODO sanitization
        this.router.get('/chats', passport.authenticate('jwt', { session: false }), this.getChats);
    }
}

const userRoutes = new UserRouter();

export default userRoutes.router;