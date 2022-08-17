const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Falinoos",
  password: "Alireza1382",
  port: 5432,
});

module.exports = pool;