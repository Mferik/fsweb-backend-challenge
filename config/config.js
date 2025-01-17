require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 9000,
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET || "shhh",
  HASH_ROUNDS: process.env.HASH_ROUNDS || 8,
};
