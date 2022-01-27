const express = require("express");
const router = express.Router();
const passport = require("passport");
const upload = require("../utils/multer");

const {
  studentLogin,
  getAllStudents,
  getAllMarks,
  getAllSubjects,
  checkAttendance,
  getStudentByName,
  getStudentByRegNum,
  updatePassword,
  forgotPassword,
  postOTP,
  postPrivateChat,
  getPrivateChat,
  differentChats,
  previousChats,
  updateProfile,
} = require("../controllers/studentController");

//Auth and Profile Related
router.post("/login", studentLogin);
router.post("/forgotPassword", forgotPassword);
router.post("/postOTP", postOTP);
router.put(
  "/updateProfile",
  passport.authenticate("jwt", { session: false }),
  updateProfile
);
router.post(
  "/updatePassword",
  passport.authenticate("jwt", { session: false }),
  updatePassword
);

//Chat Routes
router.get(
  "/chat/:roomId",
  passport.authenticate("jwt", { session: false }),
  getPrivateChat
);
router.post(
  "/chat/:roomId",
  passport.authenticate("jwt", { session: false }),
  postPrivateChat
);
router.get(
  "/chat/newerChats/:receiverName",
  passport.authenticate("jwt", { session: false }),
  differentChats
);
router.get(
  "/chat/previousChats/:senderName",
  passport.authenticate("jwt", { session: false }),
  previousChats
);

//Peformance Routes
router.get(
  "/getMarks",
  passport.authenticate("jwt", { session: false }),
  getAllMarks
);
router.get(
  "/getAllSubjects",
  passport.authenticate("jwt", { session: false }),
  getAllSubjects
);
router.get(
  "/checkAttendance",
  passport.authenticate("jwt", { session: false }),
  checkAttendance
);

//Search
router.post(
  "/getAllStudents",
  passport.authenticate("jwt", { session: false }),
  getAllStudents
);
router.post(
  "/getStudentByRegNum",
  passport.authenticate("jwt", { session: false }),
  getStudentByRegNum
);
router.post(
  "/getStudentByName",
  passport.authenticate("jwt", { session: false }),
  getStudentByName
);

module.exports = router;
