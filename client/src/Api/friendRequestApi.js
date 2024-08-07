import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");

const sendRequest = createAsyncThunk(
  "send-request",
  async (friendId, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/friendRequest/send-request/${friendId}`,
        null,
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
  }
);

const acceptRequest = createAsyncThunk(
  "accept-request",
  async (friendId, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/friendRequest/accept-request/${friendId}`,
        null,
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
  }
);

const ignoreRequest = createAsyncThunk(
  "ignore-request",
  async (friendId, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/friendRequest/ignore-request/${friendId}`,
        null,
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
  }
);

const removeFriend = createAsyncThunk(
  "remove-friend",
  async (friendId, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/friendRequest/remove/${friendId}`,
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
  }
);

export { removeFriend, acceptRequest, sendRequest, ignoreRequest };
