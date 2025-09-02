const { Pool } = require("pg");
require("dotenv").config();

// Fix for Aiven PostgreSQL self-signed SSL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL
    ? { rejectUnauthorized: false } // allow self-signed cert
    : false,
});

module.exports = pool;
