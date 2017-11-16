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
                statusText: "Account created"
            });
        }
        catch (error) {
            res.status(400).json({
                statusText: "Account not created."
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

    private signin(req: Request, res: Response, next: NextFunction) {
        console.log(req.body);
        res.json(req.body);
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