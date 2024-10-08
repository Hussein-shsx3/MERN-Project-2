import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import SignIn from "./Pages/signIn";
import SignUp from "./Pages/signUp";
import IsVerified from "./Components/isVerified";
import Profile from "./Pages/profile";
//* redux toolkit
import { storeApp } from "./Store";
import { Provider } from "react-redux";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/isVerified/:userId",
    element: <IsVerified />,
  },
  {
    path: "/profile/:userId",
    element: <Profile />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={storeApp}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
