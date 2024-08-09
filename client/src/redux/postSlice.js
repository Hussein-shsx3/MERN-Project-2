import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  getAllPosts,
  getUserPosts,
  deletePost,
  createComment,
  deleteComment,
  likeToogle,
} from "../Api/postsApi";

const initialState = {
  allPosts: null,
  userPosts: null,
  status: "idle",
};

const getPostsSlice = createSlice({
  name: "getPosts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getAllPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allPosts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getUserPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userPosts = action.payload;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(createComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createComment.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deleteComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(likeToogle.pending, (state) => {
        state.status = "loading";
      })
      .addCase(likeToogle.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(likeToogle.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default getPostsSlice.reducer;
