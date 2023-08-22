require("dotenv").config();

const config = {
  ENV: process.env.ENV || "development",
  PORT: process.env.PORT || 5004,
  SWAPI: process.env.SWAPI,
};

module.exports = config;
