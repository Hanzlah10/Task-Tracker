import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from "dotenv";
config();

const runMigration = async () => {
    try {
        const conn = await mysql.createPool({
            connectionLimit: 10,
            host: '127.0.0.1',
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const sqlFilePath = path.resolve(__dirname, '../migrations/001_create_users_table.sql');

        let sqlQuery;
        try {
            sqlQuery = fs.readFileSync(sqlFilePath, 'utf8');
        } catch (err) {
            console.error(`Error reading SQL file: ${err.message}`);
            process.exit(1);
        }

        const queries = sqlQuery.split(';').map(q => q.trim()).filter(q => q);

        for (const query of queries) {
            console.log(`Executing query: ${query}`);
            await conn.execute(query);
        }

        console.log('Migration script completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error.message);
        process.exit(1);
    }
};

runMigration();
