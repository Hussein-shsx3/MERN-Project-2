import { createSlice } from "@reduxjs/toolkit";
import {
  removeFriend,
  acceptRequest,
  sendRequest,
  ignoreRequest,
} from "../Api/friendRequestApi";

const initialState = {
  message: "",
  status: "idle",
};

const friendRequestSlice = createSlice({
  name: "friendRequest",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(removeFriend.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFriend.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message || "Friend removed successfully";
      })
      .addCase(removeFriend.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload.message || "Failed to remove friend";
      })
      .addCase(acceptRequest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(acceptRequest.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message || "Friend request accepted";
      })
      .addCase(acceptRequest.rejected, (state, action) => {
        state.status = "failed";
        state.message =
          action.payload.message || "Failed to accept friend request";
      })
      .addCase(sendRequest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendRequest.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message || "Friend request sent";
      })
      .addCase(sendRequest.rejected, (state, action) => {
        state.status = "failed";
        state.message =
          action.payload.message || "Failed to send friend request";
      })
      .addCase(ignoreRequest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(ignoreRequest.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message || "Friend request ignored";
      })
      .addCase(ignoreRequest.rejected, (state, action) => {
        state.status = "failed";
        state.message =
          action.payload.message || "Failed to ignore friend request";
      });
  },
});

export default friendRequestSlice.reducer;
