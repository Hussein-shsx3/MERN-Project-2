import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./redux/themeSlice";
import authSlice from "./redux/authSlice";
import emailVerificationSlice from "./redux/isVerifiedSlice";
import userSlice from "./redux/userSlice";

export const storeApp = configureStore({
  reducer: {
    theme: themeSlice,
    auth: authSlice,
    emailVerified: emailVerificationSlice,
    user: userSlice
  },
});
