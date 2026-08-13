const { Pool } = require("pg");
require("dotenv").config();

const isAWS = process.env.DB_HOST &&
              process.env.DB_HOST.includes("rds.amazonaws.com");

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,

    // AWS RDS PostgreSQL requires SSL.
    // Local PostgreSQL can continue connecting without SSL.
    ssl: isAWS
        ? {
            rejectUnauthorized: false
          }
        : false
});

module.exports = pool;