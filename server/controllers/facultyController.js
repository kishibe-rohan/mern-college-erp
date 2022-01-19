const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sendEmail = require("../utils/nodemailer");
const bufferConversion = require("../utils/bufferConversion");
const cloudinary = require("../utils/cloudinary");

const keys = require("../config/key");

const Student = require("../models/Student");
const Subject = require("../models/Subject");
const Faculty = require("../models/Faculty");
const Attendance = require("../models/Attendence");
const Mark = require("../models/Marks");

exports.facultyLogin = async (req, res, next) => {
  try {
    const { errors, isValid } = validateFacultyLoginInput(req.body);
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
    const sub = await Subject.findOne({ subjectCode });

    const allStudents = await Student.find({ department, year, section });

    //Get students that did not attend
    let filteredArr = allStudents.filter((item) => {
      return selectedStudents.indexOf(item.id) === -1;
    });

    //Mark attendance
    for (let i = 0; i < filteredArr.length; i++) {
      //get previous attendance record
      const prev = await Attendance.findOnr({
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

exports.getAllSubjects = async(req,res,next) => {
    try{
        const allSubjects = await Subject.find({});
        if (!allSubjects) {
            return res.status(404).json({ message: "You havent registered any subject yet." })
        }
        res.status(200).json({ allSubjects })
    }catch(err)
    {
        res.status(400).json({ message: `Error in getting all Subjects", ${err.message}` })
    }
}