import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token");
};

// registerUser
export const registerUser = createAsyncThunk(
  "registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:7000/register",
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);  
    }
  }
);

// logInUser
export const loginUser = createAsyncThunk(
  "loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const token = getToken(); // Retrieve token
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      };
      const response = await axios.post(
        "http://localhost:7000/login",
        userData,
        config // Pass config with headers
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
