const express = require("express");
const winston = require("winston");
const expressWinston = require("express-winston");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

const cors = require("cors");
const app = express();
app.use(cors());
app.use(upload.any());

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: false,
      colorize: false
    })
  ],
  meta: process.env.NODE_ENV === "development", // optional: control whether you want to log the meta data about the request (default to true)
  msg: "HTTP {{req.method}} {{req.url}} => [{{res.statusCode}}] (took {{res.responseTime}}ms)", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  // ignoreRoute: function(req, res) {
  //   return false;
  // } // optional: allows to skip some log messages based on request and/or response
});

app.use(requestLogger);

app.get("/data", (req, res) => {
  console.log(`File: ${req.file}`);
  console.log(`Files: ${req.files}`);
  console.log(`Body: ${req.body}`);
  res.json({ message: "success" });
});

app.post("/data", (req, res) => {
  // console.log(`File: ${req.file}`);
  /*
    FILE Meta:
    ----------
    {
      "fieldname":"files[]",
      "originalname":"test.json",
      "encoding":"7bit",
      "mimetype":"application/json",
      "destination":"uploads/",
      "filename":"d0207b680b40d96576f08f1453579f5a",
      "path":"uploads/d0207b680b40d96576f08f1453579f5a",
      "size":769
    }
  */
  console.log(`Files: ${req.files.length}}`);
  console.log(req.body);
  res.json({ message: "success" });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const endpoint = req.protocol + "://" + req.get("host") + req.originalUrl;
  const err = new Error(`API endpoint [${endpoint}] does not exist.`);
  err.status = 404;
  console.error(err);
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res) {
  console.error(err.toString());
  res.status(err.status || 500);
  res.send({ error: err.message });
});

app.listen((port = 8080), () => {
  console.info("Server running on http://localhost:" + port);
});
