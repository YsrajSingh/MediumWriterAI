import { Pool } from 'pg';

// postgres://user:password@host:port/dbname
const DB_USER=process.env.DB_USER
const DB_PASSWORD=process.env.DB_PASSWORD
const DB_HOST=process.env.DB_HOST
const DB_PORT=process.env.DB_PORT
const DB_NAME=process.env.DB_NAME

const DATABASE_URL = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

// Create a connection pool with environment variables
const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });
  
  // Export a reusable query function to interact with the database
  export const query = async (text: string, params?: any[]) => {
    const client = await pool.connect();
    try {
      const result = await client.query(text, params);
      return result;
    } finally {
      client.release();
    }
  };