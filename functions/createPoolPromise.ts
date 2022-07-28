import mysql from 'mysql2';

const createPoolPromise = () => {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string, 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT as string, 10),
  });
  return pool.promise();
};

export default createPoolPromise;
