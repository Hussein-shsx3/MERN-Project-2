import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import Header from "./Components/header";

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
    <section className={`${theme.mode} bg-background h-[100vh] overflow-hidden`}>
      {isVerified && token ? <Header /> : null}
    </section>
  );
};

export default App;
