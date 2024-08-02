import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./redux/themeSlice";
import authSlice from "./redux/authSlice";
import emailVerificationSlice from "./redux/isVerifiedSlice";

export const storeApp = configureStore({
  reducer: {
    theme: themeSlice,
    auth: authSlice,
    emailVerified: emailVerificationSlice,
  },
});
