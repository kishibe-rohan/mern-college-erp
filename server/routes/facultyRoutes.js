const express = require("express");
const router = express.Router();
const passport = require("passport");
const upload = require("../utils/multer");

const {
  facultyLogin,
  getAllSubjects,
  updateProfile,
  updatePassword,
  fetchStudents,
  markAttendance,
  forgotPassword,
  postOTP,
  uploadMarks,
} = require("../controllers/facultyController");

//Auth and Profile
router.post("/login", facultyLogin);
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

//Utility
router.post(
  "/fetchStudents",
  passport.authenticate("jwt", { session: false }),
  fetchStudents
);
router.post(
  "/fetchAllSubjects",
  passport.authenticate("jwt", { session: false }),
  getAllSubjects
);
router.post(
  "/markAttendance",
  passport.authenticate("jwt", { session: false }),
  markAttendance
);
router.post(
  "/uploadMarks",
  passport.authenticate("jwt", { session: false }),
  uploadMarks
);

module.exports = router;
