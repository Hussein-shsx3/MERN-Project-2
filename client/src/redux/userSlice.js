import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../Api/userApi";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const initialState = {
  user: null,
  status: "idle",
};

const userSlice = createSlice({
  name: "emailVerification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        cookies.set("user", state.user);
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default userSlice.reducer;
