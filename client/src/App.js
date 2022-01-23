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
  FacultyDashboard,
  StudentDashboard,
} from "./pages";

function App() {
  const store = useSelector((store) => store);
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<FacultyStudentLogin />} />
          <Route exact path="/faculty" element={<FacultyDashboard />} />
          <Route exact path="/home" element={<StudentDashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
