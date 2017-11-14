import { Router, Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator/check";
import { matchedData, sanitizeBody } from "express-validator/filter";
export class UserRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.init();
    }

    private signup(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        console.log(req.body)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() });
        }
        const user = matchedData(req);
        console.log(user);
        res.json(user);
    }

    private signupValidation() {
        return [
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