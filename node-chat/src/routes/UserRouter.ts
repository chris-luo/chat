import { Router, Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator/check";
import { matchedData, sanitizeBody } from "express-validator/filter";
import db from "../controllers/Database";
import { QueryConfig } from "pg";

export class UserRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.init();
    }

    private async signup(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() });
        }
        const user = matchedData(req);
        let queryConfig: QueryConfig = {
            text: `INSERT INTO chat_user(username, email, password) VALUES($1, $2, $3) RETURNING *`,
            values: [user.username, user.email, user.password]
        };

        try {
            const rows = await db.query(queryConfig);
            res.json({
                message: "Account created"
            });
        }
        catch (error) {
            res.status(500).json({
                message: error.code
            });
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
        console.log(req.body);
        const queryConfig: QueryConfig = {
            text: `SELECT * FROM chat_user WHERE email=$1`,
            values: [req.body.email]
        };
        try {
            const rows = await db.query(queryConfig);
            if (rows.length === 0) {
                //No user exists
                return res.status(401).send({
                    message: "Wrong email or password."
                });
            }
            if (rows[0].password !== req.body.password) {
                return res.status(401).send({
                    message: "Wrong email or password."
                });
            }
            res.json(rows[0]);
        }
        catch (error) {
            res.status(500).json({
                message: error.code
            });
        }
        // (async () => {
        //     const rows = await db.query(queryConfig);
        //     if (rows.length === 0) {
        //         //No user exists
        //         return res.status(401).send({
        //             message: "Wrong email or password."
        //         });
        //     }
        //     if (rows[0].password !== req.body.password) {
        //         return res.status(401).send({
        //             message: "Wrong email or password."
        //         });
        //     }
        //     res.json(rows[0]);
        // })().catch(error => {
        //     res.status(500).json({
        //         message: error.code
        //     });
        // });
    }

    private signinSanitization() {
        return sanitizeBody('email').trim().normalizeEmail()
    }

    private init() {
        this.router.post('/signup', this.signupValidation(), this.signup);
        this.router.post('/signin', this.signinSanitization(), this.signin);        
    }
}

const userRoutes = new UserRouter();

export default userRoutes.router;