const express = require("express");
const http = require("http");
const socket = require("socket.io");
const mongoose = require("mongoose");
const passport = require("passport");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

//Setup Middlewares
const app = express();
let server = http.createServer(app);
let io = socket(server);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());
app.use(cors());
app.use(passport.initialize());
require("./config/passport")(passport);

//Socket IO setup
io.on("connection", (socket) => {
  socket.on("join room", ({ room1, room2 }) => {
    socket.join(room1);
    socket.join(room2);
  });
  socket.on("private message", (message) => {
    io.to(message.room).emit("new Message", {
      message: message.message,
      sender: message.sender,
    });
  });
  socket.on("disconnect", function () {
    console.log("Socket disconnected");
  });
});

let _response = {};

//Routes
const adminRoutes = require("./routes/adminRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const studentRoutes = require("./routes/studentRoutes");

app.use("/api/admin", adminRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/student", studentRoutes);

//404 Route Error
app.use((req, res, next) => {
  const error = new Error("Invalid Route");
  error.status = 404;
  next(error);
});

//Error Handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const PORT = process.env.PORT || 5000;

//Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then((data) => {
    _response.database = "Healthy";
    console.log(`MongoDB connected with server ${data.connection.host}`);
  })
  .catch((err) => {
    console.log("Error in connecting to MongoDB", err.message);
  });

app.use("/", (req, res) => {
  res.status(200).json(_response);
});

//Start Server
server.listen(PORT, () => {
  _response.server = "Healthy";
  console.log(`Server running on port: ${PORT}`);
});
