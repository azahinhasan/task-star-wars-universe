require("dotenv").config();

const config = {
  ENV: process.env.ENV || "development",
  PORT: process.env.NODE_ENV==="test"?5005 : 5004,
  SWAPI: process.env.SWAPI,
};

module.exports = config;
