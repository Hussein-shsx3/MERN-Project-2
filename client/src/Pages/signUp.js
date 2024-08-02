import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Api/authApi";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const authState = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picturePath: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [accept, setAccept] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile.size <= MAX_FILE_SIZE) {
      setError(false);
      setImageUrl(imageFile);
    } else {
      setError(true);
      e.target.value = null;
    }
  };

  const uploadFile = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("file", imageUrl);
    data.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );
    try {
      const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
      const resourceType = "image";
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
        data
      );
      const secure_url = response.data.secure_url;
      setLoading(false);
      return secure_url;
    } catch (err) {
      setLoading(false);
      console.log("File upload error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAccept(true);
    if (imageUrl) {
      const picturePath = await uploadFile();
      if (picturePath) {
        dispatch(register({ ...formData, picturePath }));
      } else {
        console.log("error uploading file");
      }
    } else {
      console.log("imageUrl not found");
    }
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
          <div className="w-full flex flex-row gap-[20px]">
            <input
              className="input"
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              required
            />
            <input
              className="input"
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              required
            />
          </div>
          <input
            className="input"
            type="text"
            placeholder="Locatin"
            onChange={handleChange}
            required
          />
          <input
            className="input"
            type="text"
            placeholder="Occupation"
            onChange={handleChange}
            required
          />
          <input
            className="file"
            id="file"
            type="file"
            onChange={handleFileChange}
            required
          />
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          {loading || authState.status === "loading" ? (
            <div className="w-full h-[45px] flex justify-center">
              <span className="loader"></span>
            </div>
          ) : (
            <input
              className="submit text-white cursor-pointer"
              type="submit"
              value="Sign Up"
            />
          )}
          {accept && formData.password.length < 8 && (
            <p className="text-red-600">Your password is weak</p>
          )}
          {error && <p className="text-red-600">File size exceeds 2MB</p>}
          {authState.status === "succeeded" && (
            <p className="text-green-500">
              Verification email sent. Please check your Gmail.
            </p>
          )}
          {authState.error && <p className="text-red-600">{authState.error}</p>}
          <div className="w-full text-text gap-2 flex">
            <p>Already have an account ? </p>
            <Link to="/signIn" className="text-primary">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
