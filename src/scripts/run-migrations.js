import mysql from 'mysql2/promise';
import fs from 'fs';


import dotenv from "dotenv";
dotenv.config({ path: './.env' });

console.log(process.env.DB_NAME); // Log all environment variables
const runMigration = async () => {
    try {
        const conn = await mysql.createPool({
            connectionLimit: 10,
            host: '127.0.0.1',
            // port: process.env.DB_PORT,
            // user: process.env.DB_USER,
            // password: process.env.DB_PASSWORD,
            // database: process.env.DB_NAME
            port: process.env.DB_PORT,
            user: 'root',
            password: 'Hanzala@2003',
            database: 'task-tracker2'
        })

        const connection = await conn.getConnection();
        // const sqlFilePath = path.join(__dirname, 'migrations', '001_create_users_table.sql');
        const sqlFilePath = '/Users/hanzala/WEB DEV/BackEnd Practice/Backend-AfterAng/src/migrations/001_create_users_table.sql'
        const sqlQuery = fs.readFileSync(sqlFilePath, 'utf8');
        const queries = sqlQuery.split(';').map(q => q.trim()).filter(q => q);
        for (const query of queries) {
            console.log(`Executing query: ${query}`);
            await connection.execute(query);
        }
        console.log('Migration script completed.');
        connection.release();
    } catch (error) {
        console.log(error);

    } finally {
        process.exit(0);
    }

}
runMigration();



