import axios from "axios";
import authToken from "../utils/authToken";
import jwt_decode from "jwt-decode";
import {
  SET_FACULTY,
  SET_ERRORS,
  SET_FLAG,
  SET_ERRORS_HELPER,
} from "../actionTypes";

const setFaculty = (data) => {
  return {
    type: SET_FACULTY,
    payload: data,
  };
};

const fetchStudentsHelper = (data) => {
  return {
    type: "FETCH_STUDENTS",
    payload: data,
  };
};

const subjectCodeListHelper = (data) => {
  return {
    type: "GET_SUBJECTCODE_LIST",
    payload: data,
  };
};

export const facultyLogin = (credentials) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/faculty/login", credentials);
      const { token } = data;

      localStorage.setItem("facultyToken", token);
      authToken(token);

      const decoded = jwt_decode(token);
      dispatch(setFaculty(decoded));
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    }
  };
};

export const facultyUpdatePassword = (passwordData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "/api/faculty/updatePassword",
        passwordData
      );
      alert("Password Updated Successfully");
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    }
  };
};

export const getOTPFaculty = (email) => {
  return async (dispatch) => {
    try {
      await axios.post("/api/faculty/forgotPassword", email);
      alert("OTP sent to your email");
      dispatch({ type: SET_FLAG });
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    }
  };
};

export const submitOTPFaculty = (credentials) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/faculty/postOTP", credentials);
      alert("Password Updated, kindly login with updated password");
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    }
  };
};

export const fetchStudents = (department, year, section) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/faculty/fetchStudents", {
        department,
        year,
        section,
      });
      dispatch(fetchStudentsHelper(data.result));
      dispatch(subjectCodeListHelper(data.subjectCode));
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    }
  };
};

const facultyUpdateProfileFlag = (data) => {
  return {
    type: "FACULTY_UPDATE_PROFILE_FLAG",
    payload: data,
  };
};

export const facultyUpdate = (updatedData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        "/api/faculty/updateProfile",
        updatedData
      );
      dispatch(facultyUpdateProfileFlag(true));
    } catch (err) {
      alert.error("Error in updating faculty");
    }
  };
};

export const markAttendance = (
  selectedStudents,
  subjectCode,
  department,
  year,
  section
) => {
  return async (dispatch) => {
    try {
      await axios.post("/api/faculty/markAttendance", {
        selectedStudents,
        subjectCode,
        department,
        year,
        section,
      });
      //alert("Attendance has been marked successfully");
      dispatch({
        type: "HELPER",
        payload: true,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const uploadMarks = (
  subjectCode,
  exam,
  totalMarks,
  marks,
  department,
  year,
  section
) => {
  return async (dispatch) => {
    try {
      await axios.post("/api/faculty/uploadMarks", {
        subjectCode,
        exam,
        totalMarks,
        marks,
        department,
        year,
        section,
      });
      // alert("Marks uploaded successfully");
      dispatch({
        type: "HELPER",
        payload: true,
      });
    } catch (err) {
      dispatch({
        type: SET_ERRORS_HELPER,
        payload: err.response.data,
      });
    }
  };
};

export const setFacultyUser = (data) => {
  return {
    type: SET_FACULTY,
    payload: data,
  };
};

export const facultyLogout = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("facultyToken");
  // Remove auth header for future requests
  authToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setFaculty({}));
};
