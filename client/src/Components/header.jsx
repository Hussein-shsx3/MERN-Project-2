import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { setMode } from "../redux/themeSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const toggleTheme = () => {
    dispatch(setMode());
  };

  const logOut = () => {
    dispatch(logout());
    navigate("signIn");
  };

  const showList = () => {
    const head = document.getElementById("head");
    const blur = document.getElementById("blur");
    head.classList.toggle("listActive");
    blur.classList.toggle("blurActive");
  };

  return (
    <section
      className={`${theme.mode} w-full h-[65px] flex justify-center items-center bg-foreground fixed top-0 z-10`}
    >
      <div className="container relative w-[95%] sm:w-full flex items-center justify-between">
        <h1 className="text-[25px] font-bold text-primary mr-[15px]">Sociopedia</h1>
        <div className="res " id="head">
          <div className="flex flex-row h-[35px] bg-background px-[20px] rounded-[6px] mx-[25px] items-center">
            <input
              type="text"
              placeholder="Search..."
              className="h-[35px] bg-background outline-none text-title"
            />
            <i className="bx bx-search text-[18px] text-title"></i>
          </div>
          <div className="flex flex-col gap-[25px] items-center justify-center md:gap-[15px] md:flex-row">
            <div className="flex flex-row gap-8 md:gap-0">
              {localStorage.getItem("mode") === "light" ? (
                <i
                  className="bx bxs-sun text-title text-[20px] w-[35px] h-[35px] rounded-[100%] flex items-center justify-center bg-foreground cursor-pointer hover:bg-background"
                  onClick={toggleTheme}
                ></i>
              ) : (
                <i
                  className="bx bxs-moon text-title text-[20px] w-[35px] h-[35px] rounded-[100%] flex items-center justify-center cursor-pointer hover:bg-background"
                  onClick={toggleTheme}
                ></i>
              )}
              <i className="bx bxs-message-detail w-[35px] h-[35px] flex items-center justify-center text-title text-[20px] cursor-pointer rounded-[100%] hover:bg-background"></i>
              <i className="bx bxs-bell text-title w-[35px] h-[35px] flex items-center justify-center text-[20px] cursor-pointer rounded-[100%] hover:bg-background"></i>
            </div>
            <button
              className="relative text-[15px] text-title bg-background w-[150px] h-[35px] rounded-[6px] transition-all duration-[0.3] overflow-hidden hover:text-white hover:bg-primary"
              onClick={logOut}
            >
              Log Out
            </button>
          </div>
          <i
            className="bx bx-x absolute flex top-[20px] left-[25px] text-[25px] text-title md:hidden"
            onClick={showList}
          ></i>
        </div>
        <i
          className="bx bx-menu text-[23px] text-title translate-x-[-20px] flex md:hidden"
          onClick={showList}
        ></i>
      </div>
      <span
        className="fixed top-0 bg-transparent/30 backdrop-blur-[3px] hidden h-[100vh] w-full md:hidden z-[1]"
        id="blur"
        onClick={showList}
      ></span>
    </section>
  );
};

export default Header;

//* <i class='bx bxs-moon'></i>  <i class='bx bx-moon' ></i>  <i class='bx bxs-sun' ></i>  <i class='bx bx-sun' ></i>
//* <i class='bx bxs-message-detail' ></i> <i class='bx bxs-bell'></i>
