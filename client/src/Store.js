import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./redux/themeSlice";
import authSlice from "./redux/authSlice";
import emailVerificationSlice from "./redux/isVerifiedSlice";
import friendRequestSlice from "./redux/friendRequestSlice";
import userSlice from "./redux/userSlice";
import getPostsSlice from "./redux/postSlice";
import userProfileSlice from "./redux/userProfileSlice";

export const storeApp = configureStore({
  reducer: {
    theme: themeSlice,
    auth: authSlice,
    emailVerified: emailVerificationSlice,
    friendRequest: friendRequestSlice,
    user: userSlice,
    userProfile: userProfileSlice,
    post: getPostsSlice,
  },
});
