import { createSlice } from "@reduxjs/toolkit";
import { isVerified } from "../Api/isVerifiedApi";

const initialState = {
  message: "",
  status: "idle",
};

const emailVerificationSlice = createSlice({
  name: "emailVerification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(isVerified.pending, (state) => {
        state.status = "loading";
      })
      .addCase(isVerified.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload;
      })
      .addCase(isVerified.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export default emailVerificationSlice.reducer;
