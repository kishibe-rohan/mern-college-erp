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

export const chatHistory = (data) => {
  return {
    type: "SET_CHAT",
    payload: data,
  };
};

export const chatHelp = (data) => {
  return {
    type: "CHAT_HELPER",
    payload: data,
  };
};

export const getStudentByRegNumHelper = (data) => {
  return {
    type: "GET_STUDENT_BY_REG_NUM",
    payload: data,
  };
};

export const setStudent = (data) => {
  return {
    type: "SET_STUDENT",
    payload: data,
  };
};

const privateConversation = (data) => {
  return {
    type: "GET_PRIVATE_CONVERSATION",
    payload: data,
  };
};

const privateConversation2 = (data) => {
  return {
    type: "GET_PRIVATE_CONVERSATION2",
    payload: data,
  };
};

const newerChatsHelper = (data) => {
  return {
    type: "GET_NEWER_CHATS",
    payload: data,
  };
};

const previousChatsHelper = (data) => {
  return {
    type: "GET_PREVIOUS_CHATS",
    payload: data,
  };
};

const getAllSubjectsHelper = (data) => {
  return {
    type: "GET_ALL_SUBJECTS",
    payload: data,
  };
};

const fetchAttendenceHelper = (data) => {
  return {
    type: "GET_ATTENDENCE",
    payload: data,
  };
};

const getMarksHelper = (data) => {
  return {
    type: "GET_MARKS",
    payload: data,
  };
};

export const studentLogin = (studentCredentials) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "/api/student/login",
        studentCredentials
      );
      const { token } = data;

      localStorage.setItem("studentToken", token);
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
      //alert("Password Updated Successfully");
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
      dispatch(chatHelp(data.result));
    } catch (err) {
      console.log("Error in getting recent messages");
    }
  };
};

export const getStudentByRegNum = (registrationNumber) => {
  return async (dispatch) => {
    try {
      // console.log(registrationNumber);
      const { data } = await axios.post("/api/student/getStudentByRegNum", {
        registrationNumber,
      });
      dispatch(getStudentByRegNumHelper(data.result));
    } catch (err) {
      console.log(err);
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

export const submitOTPStudent = (credentials) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/student/postOTP", credentials);
      alert("Password updated. Please login again");
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
      dispatch(privateConversation(data.result));
    } catch (err) {
      console.log("Error in sending message", err.message);
    }
  };
};

export const getPrivateConversation2 = (roomId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/student/chat/${roomId}`);
      dispatch(privateConversation2(data.result));
    } catch (err) {
      console.log("Error in sending message", err.emssage);
    }
  };
};

export const previousChats = (senderName) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/api/student/chat/previousChats/${senderName}`
      );
      dispatch(previousChatsHelper(data.result));
    } catch (err) {
      console.log("Error in sending message", err.message);
    }
  };
};

export const newerChats = (receiverName) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/api/student/chat/newerChats/${receiverName}`
      );
      dispatch(newerChatsHelper(data.result));
    } catch (err) {
      console.log("Error in sending message", err.message);
    }
  };
};

export const studentUpdate = (updatedData) => {
  return async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.put(
        `/api/student/updateProfile`,
        updatedData,
        config
      );
    } catch (err) {
      console.log("Error in updating student info", err.message);
    }
  };
};

export const getAllSubjects = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/student/getAllSubjects");
      dispatch(getAllSubjectsHelper(data.result));
    } catch (err) {
      console.log("Error in getting subjects", err.message);
    }
  };
};

export const fetchAttendance = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/student/checkAttendance");
      dispatch(fetchAttendenceHelper(data.result));
    } catch (err) {
      console.log("Error in fetching attendance", err.message);
    }
  };
};

export const getMarks = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/student/getMarks");
      dispatch(getMarksHelper(data.result));
    } catch (err) {
      console.log("Error in getting marks", err.message);
    }
  };
};

export const setStudentUser = (data) => {
  return {
    type: SET_STUDENT,
    payload: data,
  };
};

export const studentLogout = () => (dispatch) => {
  localStorage.removeItem("studentToken");
  authToken(false);
  dispatch(setStudent({}));
};
