import mysql from 'mysql2';

const createConnectionPromise = () => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string, 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
  });
  return connection.promise();
};

export default createConnectionPromise;
