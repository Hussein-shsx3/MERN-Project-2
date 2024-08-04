import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Api/authApi";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [accept, setAccept] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAccept(true);
    dispatch(login(credentials))
      .unwrap()
      .then(() => {
        navigate("/"); // Redirect to a protected route on successful login
      })
      .catch((err) => {
        console.error("Login failed: ", err);
        setError(true);
      });
  };
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
          onSubmit={handleSubmit}
        >
          <h1 className="w-full mb-2 text-title">
            Welcome to Sociopedia, the Social Media For Sociopathsl
          </h1>
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />
          {authState.status === "loading" ? (
            <div className="w-full h-[45px] flex justify-center">
              <span className="loader"></span>
            </div>
          ) : (
            <input
              className="submit text-white cursor-pointer"
              type="submit"
              value="Sign In"
            />
          )}
          {accept && error && (<p className="text-red-600">Invalid email or password. Please try again.</p>)}
          <div className="w-full text-text gap-2 flex" to="/signIn">
            <p>If you dont have account ? </p>
            <Link to="/signUp" className="text-primary">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
