import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");

const getUser = createAsyncThunk("user", async (userData, thunkAPI) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const getUserProfile = createAsyncThunk("userProfile", async (userId, thunkAPI) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export { getUser, getUserProfile };
