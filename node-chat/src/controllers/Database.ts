import { Pool, Client, QueryResult, QueryConfig } from "pg";
import * as config from "config";

export class Database {
    pool: Pool;
    constructor() {
        this.initialize();
    }

    private initialize() {
        this.pool = new Pool({
            user: config.get('DB_USER'),
            host: config.get('DB_HOST'),
            password: config.get('DB_PASSWORD'),            
            database: config.get('DB_DATABASE'),
            port: config.get('DB_PORT')
        });
    }

    async query(queryConfig: QueryConfig): Promise<any[]> {
        console.log(queryConfig);
        try {
            const { rows }: QueryResult = await this.pool.query(queryConfig);
            console.log(rows);
            return rows;
        }
        catch (error) {
             console.log(error.code);
             throw error;
        }
    }

    get(queryConfig: QueryConfig) {
        (async () => {
            const client: Client = await this.pool.connect();
            try {
                const res: QueryResult = await client.query(queryConfig);
                console.log(res.rows);
            } finally {
                client.release();
            }
        })().catch(e => console.log(e));
    }
}

const database = new Database();
export default database;