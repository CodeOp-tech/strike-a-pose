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
var imagesRouter = require("./routes/images");

var app = express();

app.use(logger("dev"));
app.use(cors()); // add after 'app' is created
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res, next) {
  res.send("hrllo");
});

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/images", imagesRouter);

module.exports = app;
