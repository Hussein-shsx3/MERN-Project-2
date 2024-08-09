import React from "react";
import { useSelector } from "react-redux";

const CreatePost = () => {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return (
      <div className="w-full md:w-[340px] flex justify-center items-center">
        <span className="loader"></span>
      </div>
    ); //* Handle case when user data is not available
  }

  return (
    <section className="w-full bg-foreground h-[150px] p-[15px] rounded-[12px]">
      <div className="flex justify-between">
        <img
          src={user.picturePath}
          alt=""
          className="w-[45px] h-[45px] rounded-[100%] object-cover"
        />
        <input
          type="text"
          placeholder="What's on your mind..."
          className="w-[88%] bg-background rounded-[20px] px-5 text-[14px] outline-none"
        />
      </div>
      <hr className="w-full h-[2px] border-none bg-background my-[20px]" />
    </section>
  );
};

export default CreatePost;
