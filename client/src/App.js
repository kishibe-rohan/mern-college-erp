import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";
import authToken from "./redux/utils/authToken";
import store from "./redux/store";

import { setFacultyUser, facultyLogout } from "./redux/actions/facultyAction";
import {
  setAdminUser,
  adminLogout,
  adminGetAllStudent,
} from "./redux/actions/adminAction";
import { setStudentUser, studentLogout } from "./redux/actions/studentAction";

import {
  FacultyStudentLogin,
  AdminLogin,
  AdminDashboard,
  AdminGetFaculty,
  AdminGetStudents,
  AdminGetSubjects,
  AdminAddFaculty,
  AdminAddStudent,
  AdminAddSubject,
  FacultyDashboard,
  FacultyUploadMarks,
  FacultyAttendance,
  StudentDashboard,
  StudentSubjectList,
  StudentPerformance,
  StudentAttendance,
  StudentUpdateProfile,
  StudentUpdatePassword,
  StudentSearch,
  StudentDetails,
  FacultyUpdateProfile,
  FacultyUpdatePassword,
  ForgotPassword,
  Chat,
  StudentChats,
} from "./pages";

//Handle JWT Token
if (window.localStorage.facultyToken) {
  authToken(localStorage.facultyToken);
  const decoded = jwt_decode(localStorage.facultyToken);
  store.dispatch(setFacultyUser(decoded));

  //Check if token expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(facultyLogout());
    window.location.href = "/";
  }
} else if (window.localStorage.studentToken) {
  authToken(localStorage.studentToken);
  const decoded = jwt_decode(localStorage.studentToken);
  store.dispatch(setStudentUser(decoded));

  //Check if token expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(studentLogout());
    window.location.href = "/";
  }
} else if (window.localStorage.adminToken) {
  authToken(localStorage.adminToken);
  const decoded = jwt_decode(localStorage.adminToken);
  store.dispatch(setAdminUser(decoded));

  //Check if token expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(adminLogout());
    window.location.href = "/";
  }
}

function App() {
  const store = useSelector((store) => store);
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<FacultyStudentLogin />} />
          <Route exact path="/admin/login" element={<AdminLogin />} />
          <Route exact path="/faculty" element={<FacultyDashboard />} />
          <Route exact path="/home" element={<StudentDashboard />} />
          <Route exact path="/admin" element={<AdminDashboard />} />
          <Route exact path="/admin/faculties" element={<AdminGetFaculty />} />
          <Route exact path="/admin/students" element={<AdminGetStudents />} />
          <Route exact path="/admin/subjects" element={<AdminGetSubjects />} />
          <Route
            exact
            path="/admin/add/faculties"
            element={<AdminAddFaculty />}
          />
          <Route
            exact
            path="/admin/add/students"
            element={<AdminAddStudent />}
          />
          <Route
            exact
            path="/admin/add/subjects"
            element={<AdminAddSubject />}
          />
          <Route
            exact
            path="/student/subjects"
            element={<StudentSubjectList />}
          />
          <Route
            exact
            path="/student/performance"
            element={<StudentPerformance />}
          />
          <Route
            exact
            path="/student/attendance"
            element={<StudentAttendance />}
          />
          <Route exact path="/student/search" element={<StudentSearch />} />
          <Route exact path="/student/chatList" element={<StudentChats />} />
          <Route
            exact
            path="/profile/:registrationNumber"
            element={<StudentDetails />}
          />
          <Route
            exact
            path="/student/update"
            element={<StudentUpdateProfile />}
          />
          <Route
            exact
            path="/faculty/update"
            element={<FacultyUpdateProfile />}
          />
          <Route exact path="/faculty/marks" element={<FacultyUploadMarks />} />
          <Route
            exact
            path="/faculty/attendance"
            element={<FacultyAttendance />}
          />
          <Route
            exact
            path="/student/updatePassword"
            element={<StudentUpdatePassword />}
          />
          <Route
            exact
            path="/faculty/updatePassword"
            element={<FacultyUpdatePassword />}
          />
          <Route
            exact
            path="/forgotPassword/:user"
            element={<ForgotPassword />}
          />
          <Route exact path="/chat/:room" element={<Chat />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
