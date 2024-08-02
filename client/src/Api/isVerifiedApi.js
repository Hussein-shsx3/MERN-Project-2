import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const isVerified = createAsyncThunk(
  "auth/isVerified",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/verify/${userId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export { isVerified };
