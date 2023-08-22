const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const http = require("http");
const helmet = require("helmet");

const app = express();
const upload = multer();
const server = http.Server(app);

// Config
const config = require("./config/config");
// const winston = require("./config/winston");

// Import Routes
const peopleRoutes = require("./routes/people.routes");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.any());
//app.use(morgan("combined", { stream: winston.stream }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());

// Mount routes
app.use("/api", peopleRoutes);



// Home
app.get("/", function (req, res) {
  res
    .status(200)
    .json({ success: true, messages: "Welcome to API home page!" });
});

// Listen to the PORT
app.listen(config.PORT, () => {
  console.log(`Example app listening at http://localhost:${config.PORT}`);
});

module.exports = { app, server };
