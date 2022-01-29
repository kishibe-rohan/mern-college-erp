const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Utils
const sendEmail = require("../utils/nodemailer");
const bufferConversion = require("../utils/bufferConversion");
const cloudinary = require("../utils/cloudinary");

const keys = require("../config/key");

//Validation
const validateFacultyLoginInput = require("../validation/facultyLogin");
const validateFetchStudentsInput = require("../validation/facultyFetchStudent");
const validateFacultyUpdatePassword = require("../validation/facultyUpdatePassword");
const validateForgotPassword = require("../validation/forgotPassword");
const validateOTP = require("../validation/otpValidation");
const validateFacultyUploadMarks = require("../validation/facultyUploadMarks");

//Models
const Student = require("../models/Student");
const Subject = require("../models/Subject");
const Faculty = require("../models/Faculty");
const Attendance = require("../models/Attendance");
const Mark = require("../models/Marks");

exports.facultyLogin = async (req, res, next) => {
  try {
    const { errors, isValid } = validateFacultyLoginInput(req.body);
    //console.log(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { registrationNumber, password } = req.body;
    const faculty = await Faculty.findOne({ registrationNumber });
    if (!faculty) {
      errors.registrationNumber = "Registration number not found";
      return res.status(404).json(errors);
    }

    const validPassword = await bcrypt.compare(password, faculty.password);
    if (!validPassword) {
      errors.password = "Invalid Password";
      return res.status(404).json(errors);
    }

    const payload = {
      id: faculty.id,
      faculty,
    };

    jwt.sign(payload, keys.secretOrKey, { expiresIn: "2d" }, (err, token) => {
      res.json({
        success: true,
        token: "Bearer " + token,
      });
    });
  } catch (err) {
    console.log("Error in faculty login", err.message);
  }
};

exports.fetchStudents = async (req, res, next) => {
  try {
    const { errors, isValid } = validateFetchStudentsInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { department, year, section } = req.body;
    const subjectList = await Subject.find({ department, year });

    if (subjectList.length === 0) {
      errors.department = "No subjects found in given department";
      return res.status(404).json(errors);
    }

    const students = await Student.find({
      department,
      year,
      section,
    });

    if (students.length === 0) {
      errors.department = "No Student found";
      return res.status(404).json(errors);
    }

    res.status(200).json({
      result: students.map((student) => {
        var student = {
          _id: student._id,
          registrationNumber: student.registrationNumber,
          name: student.name,
          email: student.email,
        };

        return student;
      }),
      subjectCode: subjectList.map((sub) => {
        return sub.subjectCode;
      }),
    });
  } catch (err) {
    console.log("Error in fetchStudents", err.message);
  }
};

exports.markAttendance = async (req, res, next) => {
  try {
    const { selectedStudents, subjectCode, department, year, section } =
      req.body;

    console.log(req.body);
    const sub = await Subject.findOne({ subjectCode });

    const allStudents = await Student.find({ department, year, section });

    //Get students that did not attend
    let filteredArr = allStudents.filter((item) => {
      return selectedStudents.indexOf(item.id) === -1;
    });

    //Mark attendance
    for (let i = 0; i < filteredArr.length; i++) {
      //get previous attendance record
      const prev = await Attendance.findOne({
        student: filteredArr[i]._id,
        subject: sub._id,
      });

      if (!prev) {
        const attendance = new Attendance({
          student: filteredArr[i],
          subject: sub._id,
        });

        attendance.totalLectures += 1;
        await attendance.save();
      } else {
        prev.totalLectures += 1;
        await prev.save();
      }
    }

    for (let j = 0; j < selectedStudents.length; j++) {
      const prev = await Attendance.findOne({
        student: selectedStudents[j],
        subject: sub._id,
      });
      if (!prev) {
        const attendance = new Attendance({
          student: selectedStudents[j],
          subject: sub._id,
        });

        attendance.totalLectures += 1;
        attendance.lecturesAttended += 1;
        await attendance.save();
      } else {
        prev.totalLectures += 1;
        prev.lecturesAttended += 1;
        await prev.save();
      }
    }

    res.status(200).json({ message: "Attendance marked" });
  } catch (err) {
    return res.status(400).json({ message: "Error in marking attendance" });
  }
};

exports.uploadMarks = async (req, res, next) => {
  try {
    const { errors, isValid } = validateFacultyUploadMarks(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { subjectCode, exam, totalMarks, marks, department, year, section } =
      req.body;

    const subject = await Subject.findOne({ subjectCode });
    const alreadyMarked = await Mark.find({
      exam,
      department,
      section,
      subjectCode: subject._id,
    });

    if (alreadyMarked.length !== 0) {
      errors.exam = "Marks have already been uploaded for this record";
      return res.status(400).json(errors);
    }

    for (let i = 0; i < marks.length; i++) {
      const newMarks = await new Mark({
        student: marks[i]._id,
        subject: subject._id,
        exam,
        department,
        section,

        marks: marks[i].value,
        totalMarks,
      });

      await newMarks.save();
    }

    res.status(200).json({ message: "Marks uploaded successfully" });
  } catch (err) {
    console.log("Error in uploading marks");
  }
};

exports.getAllSubjects = async (req, res, next) => {
  try {
    const allSubjects = await Subject.find({});
    if (!allSubjects) {
      return res
        .status(404)
        .json({ message: "You havent registered any subject yet." });
    }
    res.status(200).json({ allSubjects });
  } catch (err) {
    res
      .status(400)
      .json({ message: `Error in getting all Subjects", ${err.message}` });
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const { errors, isValid } = validateFacultyUpdatePassword(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { registrationNumber, oldPassword, newPassword, confirmNewPassword } =
      req.body;
    if (newPassword !== confirmNewPassword) {
      errors.confirmNewPassword = "Password Mismatch";
      return res.status(404).json(errors);
    }
    const faculty = await Faculty.findOne({ registrationNumber });
    const isCorrect = await bcrypt.compare(oldPassword, faculty.password);
    if (!isCorrect) {
      errors.oldPassword = "Invalid old Password";
      return res.status(404).json(errors);
    }
    let hashedPassword;
    hashedPassword = await bcrypt.hash(newPassword, 10);
    faculty.password = hashedPassword;
    await faculty.save();
    res.status(200).json({ message: "Password Updated" });
  } catch (err) {
    console.log("Error in updating password", err.message);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { errors, isValid } = validateForgotPassword(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { email } = req.body;
    const faculty = await Faculty.findOne({ email });
    if (!faculty) {
      errors.email = "Email Not found, Provide registered email";
      return res.status(400).json(errors);
    }
    function generateOTP() {
      var digits = "0123456789";
      let OTP = "";
      for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }
      return OTP;
    }
    const OTP = generateOTP();
    faculty.otp = OTP;
    await faculty.save();
    await sendEmail(faculty.email, OTP, "OTP");
    res.status(200).json({ message: "Check your registered Email for OTP" });
    const helper = async () => {
      faculty.otp = "";
      await faculty.save();
    };
    setTimeout(function () {
      helper();
    }, 300000);
  } catch (err) {
    console.log("Error in sending OTP email", err.message);
  }
};

exports.postOTP = async (req, res, next) => {
  try {
    const { errors, isValid } = validateOTP(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { email, otp, newPassword, confirmNewPassword } = req.body;
    if (newPassword !== confirmNewPassword) {
      errors.confirmNewPassword = "Password Mismatch";
      return res.status(400).json(errors);
    }

    const faculty = await Faculty.findOne({ email });
    if (faculty.otp !== otp) {
      errors.otp = "Invalid OTP..Please try again";
      return res.status(400).json(errors);
    }

    let hashedPassword;
    hashedPassword = await bcrypt.compare(newPassword, 10);
    faculty.password = hashedPassword;
    await faculty.save();

    return res.status(200).json({ message: "Password Changed" });
  } catch (err) {
    console.log("Error in submitting OTP", err.message);
    return res.status(400).json(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { email, facultyMobileNumber, registrationNumber } = req.body;

    const faculty = await Faculty.findOne({ registrationNumber });
    //console.log(faculty);

    const { _id } = faculty;

    const updatedData = {
      email: email || faculty.email,
      facultyMobileNumber: facultyMobileNumber || faculty.facultyMobileNumber,
    };

    if (req.body.avatar !== "") {
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "erp",
        width: 150,
        crop: "scale",
      });

      updatedData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const updatedFaculty = await Faculty.findByIdAndUpdate(_id, updatedData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log("Error in updating Profile", err.message);
  }
};
