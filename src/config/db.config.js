import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const sqlConnection = async (query, varArray = []) => {
    try {
        const pool = mysql.createPool({
            connectionLimit: 10,
            host: 'localhost',
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        })
        const connection = await pool.getConnection();
        const [result] = await connection.execute(query, varArray);

        connection.release();
        return result
    } catch (error) {
        console.log(error);

    }
}
export {
    sqlConnection
}