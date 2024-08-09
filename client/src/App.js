import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import Header from "./Components/header";
import UserProfile from "./Components/userProfile";
import Friends from "./Components/friends";
import Sponsored from "./Components/sponsored";
import { getUser } from "./Api/userApi";
import FriendRequest from "./Components/friendRequest";
import CreatePost from "./Components/createPost";

const App = () => {
  const cookies = new Cookies();
  const theme = useSelector((state) => state.theme);
  const token = cookies.get("token");
  const isVerified = cookies.get("isVerified");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(getUser());
  useEffect(() => {
    if (!isVerified || !token) {
      navigate("/signIn");
    }
  }, [isVerified, token, navigate]);

  return (
    <section
      className={`${theme.mode} bg-background w-full flex justify-center pt-[80px]`}
    >
      {isVerified && token ? (
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex flex-col items-center overflow-hidden">
            <Header />
          </div>
          <div className="container w-[95%] md:w-full flex flex-col md:flex-row justify-between items-start">
            <div className="h-[100%] w-full md:w-auto">
              <UserProfile />
              <Friends />
            </div>
            <section className="w-[100%] md:w-[43%] h-[150dvh] flex flex-col items-center mt-5 md:mt-0">
              <CreatePost />
            </section>
            <div className="h-[100%]">
              <Sponsored />
              <FriendRequest />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default App;
