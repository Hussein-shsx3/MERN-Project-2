import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SignIn = () => {
  const theme = useSelector((state) => state.theme);
  return (
    <section
      className={`w-full h-[100vh] flex flex-col items-center bg-background ${theme.mode}`}
    >
      <h1 className="w-full py-[20px] text-[25px] font-bold text-primary text-center bg-foreground">
        Sociopedia
      </h1>
      <div className="container w-full flex justify-center">
        <form
          className="w-[90%] my-[25px] p-[20px] bg-foreground flex flex-col items-center lg:w-[65%] "
          action=""
        >
          <h1 className="w-full mb-2 text-title">
            Welcome to Sociopedia, the Social Media For Sociopathsl
          </h1>
          <input className="input" type="email" placeholder="Email" />
          <input className="input" type="password" placeholder="Password" />
          <input
            className="submit text-white cursor-pointer"
            type="submit"
            value="Sign Up"
          />
          <p className="w-full text-text gap-2 flex" to="/signIn">
            <p>If you dont have account ? </p>
            <Link to="/signIn" className="text-primary">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
