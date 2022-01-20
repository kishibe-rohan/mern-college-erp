import axios from "axios";
import authToken from "../utils/authToken";
import jwt_decode from "jwt-decode";
import {
  SET_STUDENT,
  SET_ERRORS_HELPER,
  SET_ERRORS,
  STUDENT_UPDATE_PASSWORD,
  SET_OTP,
  SET_FLAG,
} from "../actionTypes";

export const studentLogin = (studentCredentials) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "/api/student/login",
        studentCredentials
      );
      const { token } = data;

      localStorgae.setItem("studentToken", token);
      authToken(token);

      const decoded = jwt_decode(token);
      dispatch(setStudent(decoded));
    } catch (err) {
      dispatch({
        type: SET_ERRORS_HELPER,
        payload: err.response.data,
      });
    }
  };
};

export const studentUpdatePassword = (passwordData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "/api/student/updatePassword",
        passwordData
      );
      alert("Password Updated Successfully");
    } catch (err) {
      dispatch({
        type: SET_ERRORS_HELPER,
        payload: err.response.data,
      });
    }
  };
};

export const chatHelper = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/student/getStudentByName", name);
      dispatch(chatHelper(data.result));
    } catch (err) {
      console.log("Error in getting recent messages");
    }
  };
};

export const getStudentByRegNum = (registrationNumber) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "/api/student/getStudentByReg",
        registrationNumber
      );
      dispatch(getStudentByRegNumHelper(data.result));
    } catch (err) {
      console.log();
    }
  };
};

export const getOTPStudent = (email) => {
  return async (dispatch) => {
    try {
      await axios.post("/api/student/forgotPassword", email);
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

export const submitOTPStudent = (newPassword, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/student/postOTP", newPassword);
      alert("Password updated. Please login again");
      history.push("/");
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    }
  };
};

export const sendMessage = (room, messageObj) => {
  return async () => {
    try {
      const { data } = await axios.post(
        `/api/student/chat/${room}`,
        messageObj
      );
    } catch (err) {
      console.log("Error in sending message", err.message);
    }
  };
};

export const getPrivateConversation = (roomId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/student/chat/${roomId}`);
      dispatch(getPrivateConversation(data.result));
    } catch (err) {
      console.log("Error in sendign message", err.message);
    }
  };
};
