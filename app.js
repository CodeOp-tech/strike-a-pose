// 1. install dependecies
// 2. import dependecies
// 3. set up webcam and CanvasCaptureMediaStreamTrack
// 4. define renferencies for those
// 5. Load posetNet
// 6. Detect function
// 7. Drawing utilities from TensorFlow
// 8. Draw function

const cors = require("cors"); // add at the top
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const { runInThisContext } = require("vm");

var app = express();

app.use(logger("dev"));
app.use(cors()); // add after 'app' is created
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
