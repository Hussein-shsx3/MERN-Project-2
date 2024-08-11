import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isVerified } from "../Api/isVerifiedApi";
import { Link, useParams } from "react-router-dom";

const IsVerified = () => {
  const { userId } = useParams();
  const status = useSelector((state) => state.emailVerified);
  console.log(status);
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(isVerified(userId));
  };

  return (
    <section
      className={`w-full h-[100vh] bg-background flex justify-center items-center ${theme.mode}`}
    >
      {status.status === "loading" ? (
        <div className="w-full h-[45px] flex justify-center">
          <span className="loader"></span>
        </div>
      ) : status.status === "succeeded" ? (
        <div className="flex flex-col items-center">
          <i className="bx bxs-badge-check text-[100px] text-primary mb-5"></i>
          <Link
            to="/signIn"
            className="w-[200px] bg-primary h-[45px] text-white text-[18px] flex justify-center items-center rounded-[25px]"
          >
            Sign In
          </Link>
        </div>
      ) : (
        <button
          className="w-[200px] bg-primary h-[45px] text-white rounded-[25px]"
          onClick={handleSubmit}
        >
          Verify your account
        </button>
      )}
    </section>
  );
};

export default IsVerified;
