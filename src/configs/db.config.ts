import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  keepAlive: true, 
});

pool.connect()
  .then(() => console.log("✅ DB Connected successfully"))
  .catch((err) => console.error("❌ DB Connection error:", err));

export const db = drizzle(pool);
