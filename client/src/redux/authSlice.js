import { createSlice } from "@reduxjs/toolkit";
import { register, login } from "../Api/authApi";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const initialState = {
  user: null,
  token: cookies.get("token") || null,
  verify: cookies.get("isVerified") || null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      cookies.remove("token", { path: "/" });
      cookies.remove("isVerified", { path: "/" });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.userDetails;
        state.token = action.payload.token;
        cookies.set("token", action.payload.token, { path: "/" });
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.userDetails;
        state.token = action.payload.token;
        cookies.set("token", action.payload.token, { path: "/" });
        state.verify = action.payload.userDetails.isVerified;
        cookies.set("isVerified", action.payload.userDetails.isVerified, {
          path: "/",
        });
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
