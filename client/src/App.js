import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import Header from "./Components/header";
import UserProfile from "./Components/userProfile";
import Friends from "./Components/friends";
import Sponsored from "./Components/sponsored";
import FriendRequest from "./Components/friendRequest";
import CreatePost from "./Components/createPost";
import Posts from "./Components/posts";
import { getUser } from "./Api/userApi";

const App = () => {
  const cookies = new Cookies();
  const theme = useSelector((state) => state.theme);
  const status = useSelector((state) => state.user.status);
  const dispatch = useDispatch();
  const token = cookies.get("token");
  const isVerified = cookies.get("isVerified");

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (!isVerified || !token || status === "failed") {
      document.location.pathname = "/signIn";
    }
  }, [isVerified, token, status]);

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
            <div className="h-auto md:h-[100%] w-full md:w-auto">
              <UserProfile user="none" />
              <Friends user="" />
            </div>
            <section className="relative min-h-[100dvh] w-[100%] flex flex-col px-0 md:px-1 lg:px-5">
              <CreatePost user="none" />
              <Posts postType="allPosts" />
            </section>
            <div className="h-[100%]">
              <Sponsored />
              <FriendRequest user="" />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default App;
