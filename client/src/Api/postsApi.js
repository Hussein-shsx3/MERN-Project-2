import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");

const createPost = createAsyncThunk("posts", async (postData, thunkAPI) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/posts`,
      postData,
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
});

const getUserPosts = createAsyncThunk(
  "userPosts",
  async (postData, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/posts`,
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

const getAllPosts = createAsyncThunk("allPosts", async (postData, thunkAPI) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/posts/allPosts`,
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
});

const deletePost = createAsyncThunk("deletePost", async (post, thunkAPI) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/posts/${post.id}`,
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
});

const createComment = createAsyncThunk(
  "createComment",
  async (postId, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/posts/addComment/${postId}`,
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
//! need complete
const deleteComment = createAsyncThunk(
  "deleteComment",
  async (post, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/posts/deleteComment/${post.id}/comment/${post.comments}`,
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

const likeToogle = createAsyncThunk("likeToogle", async (postId, thunkAPI) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/posts/${postId}/like`,
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
});

export {
  createPost,
  getAllPosts,
  getUserPosts,
  deletePost,
  createComment,
  deleteComment,
  likeToogle,
};
