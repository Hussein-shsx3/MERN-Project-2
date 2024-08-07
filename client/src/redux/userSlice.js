import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../Api/userApi";

const initialState = {
  user: null,
  message: "",
  status: "idle",
};

const getUserSlice = createSlice({
  name: "getUser",
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
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export default getUserSlice.reducer;
