import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../Api/postsApi";
import axios from "axios";

const CreatePost = (props) => {
  const inputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    postImage: "",
  });

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  const user = useSelector((state) =>
    props.user === "userProfile"
      ? state.userProfile.userProfile
      : state.user.user
  );

  const myProfile = useSelector((state) => state.user.user);
  const userStatus = useSelector((state) => state.user.status);
  const postStatus = useSelector((state) => state.post.status);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile.size <= MAX_FILE_SIZE) {
      setImageUrl(imageFile);
    } else {
      e.target.value = null;
      setImageUrl("");
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
    if (imageUrl) {
      const postImage = await uploadFile();
      if (postImage) {
        dispatch(createPost({ ...formData, postImage }));
        setImageUrl("");
      } else {
        console.log("error uploading file");
      }
    } else {
      dispatch(createPost(formData));
    }
  };

  if (!user || userStatus === "loading" || postStatus === "loading") {
    return <div></div>;
  }
  return (
    <form
      className={`w-full bg-foreground p-[15px] rounded-[12px] mb-5 ${
        props.user === "userProfile" && user._id !== myProfile._id
          ? "hidden"
          : ""
      }`}
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between gap-2">
        <img
          src={user.picturePath}
          alt=""
          className="w-[45px] h-[45px] rounded-[100%] object-cover"
        />
        <input
          type="text"
          placeholder="What's on your mind..."
          className="w-[90%] bg-background rounded-[20px] px-5 text-[14px] outline-none text-text"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>
      <hr className="w-full h-[2px] border-none bg-background my-[20px]" />
      <div className="flex items-center justify-between">
        <div
          className="flex items-center gap-2 text-text text-[12px] md:text-[13px] lg:text-[14px] hover:text-title cursor-pointer"
          onClick={() => inputRef.current.click()}
        >
          <i className="bx bx-image-add"></i>
          <p>Image</p>
        </div>
        <div className="flex items-center gap-2 text-text text-[12px] md:text-[13px] lg:text-[14px] hover:text-title cursor-pointer">
          <i className="bx bxs-video"></i>
          <p>Video</p>
        </div>
        <div className="flex items-center gap-2 text-text text-[12px] md:text-[13px] lg:text-[14px] hover:text-title cursor-pointer">
          <i className="bx bx-link"></i>
          <p>Attachment</p>
        </div>
        <button className="w-[70px] h-[35px] bg-background text-title text-[13px] md:text-[14px] lg:text-[15px]  rounded-[15px] hover:text-white hover:bg-primary transition-colors duration-100">
          POST
        </button>
      </div>
      <input type="file" ref={inputRef} hidden onChange={handleFileChange} />
      <p className="text-text text-[13px]">
        {imageUrl ? `${imageUrl.name}...` : ""}
      </p>
      {loading ? (
        <div className="w-full h-[45px] flex justify-center">
          <span className="loader"></span>
        </div>
      ) : (
        ""
      )}
    </form>
  );
};

export default CreatePost;
