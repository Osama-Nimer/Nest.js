import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";


const pool = new Pool({
  
  connectionString: process.env.NEON_URL,
  ssl: {
    rejectUnauthorized: false, 
  },
});


export const db = drizzle(pool);