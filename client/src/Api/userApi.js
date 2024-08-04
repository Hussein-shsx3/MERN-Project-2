import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");
const getUser = createAsyncThunk(
  "auth/user",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export { getUser };
