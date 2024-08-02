import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMode } from "./redux/themeSlice";

const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const toggleTheme = () => {
    dispatch(setMode());
  };

  return (
    <div className={`${theme.mode} bg-background`}>
      <h1 className="text-text" onClick={toggleTheme}>
        hello
      </h1>
    </div>
  );
};

export default App;
