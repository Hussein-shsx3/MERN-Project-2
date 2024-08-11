import { createSlice } from "@reduxjs/toolkit";
import { getUserProfile } from "../Api/userApi";

const initialState = {
  userProfile: null,
  message: "",
  status: "idle",
};

const userProfileSlice = createSlice({
  name: "getUserProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userProfile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export default userProfileSlice.reducer;
