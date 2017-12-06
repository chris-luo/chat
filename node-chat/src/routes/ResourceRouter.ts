import { Router, Request, Response, NextFunction } from "express";
import db from "../controllers/Database";
import { QueryConfig } from "pg";

export class ResourceRouter {
    router: Router;
    
    constructor() {
        this.router = Router();
        this.init();
    }

    private async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            let queryConfig: QueryConfig = {
                text: `SELECT id, username, email FROM chat_user WHERE email=$1 or username=$1`,
                values: [req.query.user]
            };
            const rows = await db.query(queryConfig);
            if (rows.length > 0) {
                return res.status(409).json({
                    message: "User already exists.",
                });
            }
            return res.json({
                message: "Success",
                data: rows.length
            });
        } catch (error) {
            return res.status(500).json({
                message: error.code
            });
        }
    }

    private async findUser(req: Request, res: Response, next: NextFunction) {
        try {
            let queryConfig: QueryConfig = {
                text: `SELECT id, username, email FROM chat_user WHERE email=$1 or username=$1`,
                values: [req.query.user]
            };
            const rows = await db.query(queryConfig);
            if (rows.length === 0) {
                return res.status(409).json({
                    message: "User does not exist.",
                });
            }
            return res.json({
                message: "Success",
                data: rows.length
            });
        } catch (error) {
            return res.status(500).json({
                message: error.code
            });
        }
    }

    private init() {
        this.router.get('/users', this.getUsers);
        this.router.get('/user', this.findUser)
    }
}

const resourceRoutes = new ResourceRouter();

export default resourceRoutes.router;