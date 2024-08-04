import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import Header from "./Components/header";
import UserProfile from "./Components/userProfile";
import Friends from "./Components/friends";

const App = () => {
  const cookies = new Cookies();
  const theme = useSelector((state) => state.theme);
  const token = cookies.get("token");
  const isVerified = cookies.get("isVerified");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isVerified || !token) {
      navigate("/signIn");
    }
  }, [isVerified, token, navigate]);

  return (
    <section
      className={`${theme.mode} bg-background h-[110vh] overflow-hidden w-full flex justify-center pt-[90px]`}
    >
      {isVerified && token ? (
        <div className="w-full flex flex-col items-center">
          <Header />
          <div className="container w-[95%] md:w-full">
            <div className="w-[100%] lg:w-[23%] flex flex-col items-center">
              <UserProfile />
              <Friends />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default App;
