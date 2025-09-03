const { Pool } = require("pg");
require("dotenv").config();

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL
    ? { rejectUnauthorized: false } // For Render / Aiven SSL
    : false,
});

module.exports = pool;
