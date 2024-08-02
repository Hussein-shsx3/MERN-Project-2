import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMode } from "./redux/themeSlice";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const App = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const token = cookies.get("token");
  const isVerified = cookies.get("isVerified");
  const navigate = useNavigate();
  const toggleTheme = () => {
    dispatch(setMode());
  };

  useEffect(() => {
    if (!isVerified || !token) {
      navigate("/signIn");
    }
  }, [isVerified, token, navigate]);

  return (
    <section className={`${theme.mode} bg-background`}>
      {isVerified && token ? (
        <h1 className="text-text" onClick={toggleTheme}>
          hello
        </h1>
      ) : null}
    </section>
  );
};

export default App;
