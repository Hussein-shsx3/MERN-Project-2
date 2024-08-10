import React, { useEffect } from "react";
import UserDetails from "./userDetails";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../Api/postsApi";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.allPosts);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const likeToggle = () => {
    document.getElementById("like").classList.toggle("text-red-500");
  };

  const commentToggle = () => {
    document.getElementById("comments").classList.toggle("hidden");
  };

  if (!posts) {
    return (
      <div className="w-full flex justify-center items-center">
        <span className="loader"></span>
      </div>
    ); //* Handle case when user data is not available
  }

  const showPosts = posts.map((post) => {
    return (
      <div
        className="flex flex-col mb-5 bg-foreground rounded-[12px] py-[20px] px-[15px]"
        key={post._id}
      >
        <div className="flex items-center justify-between">
          <UserDetails
            picturePath={post.user.picturePath}
            firstName={post.user.firstName}
            lastName={post.user.lastName}
            location={post.user.location}
          />
          {user._id === post.user._id ||
          post.user.id.friendRequests.includes(user._id) ? (
            ""
          ) : post.user.id.friends.includes(user._id) ? (
            <i className="bx bx-user-minus text-text h-[35px] w-[35px] flex justify-center items-center rounded-[100%] bg-background text-[20px] cursor-pointer translate-y-[-6px] transition-colors duration-100 hover:text-title"></i>
          ) : (
            <i className="bx bx-user-plus text-text h-[35px] w-[35px] flex justify-center items-center rounded-[100%] bg-background text-[20px] cursor-pointer translate-y-[-6px] transition-colors duration-100 hover:text-title"></i>
          )}
        </div>
        <p className="text-text text-[14px] ">
          Some realy long random description.
        </p>
        <img
          src="./images/info4.jpeg"
          alt=""
          className="w-full my-3 object-cover rounded-[8px]"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <i
              className="bx bxs-heart text-text text-[20px] cursor-pointer h-[35px] w-[35px] flex justify-center items-center hover:bg-background rounded-[100%]"
              id="like"
              onClick={likeToggle}
            ></i>
            <p className="text-text text-[14px]">6</p>
            <i
              className="bx bxs-comment text-text text-[20px] cursor-pointer h-[35px] w-[35px] flex justify-center items-center hover:bg-background rounded-[100%]"
              onClick={commentToggle}
            ></i>
            <p className="text-text text-[14px]">3</p>
          </div>
          <i className="bx bxs-share-alt text-text text-[20px] cursor-pointer h-[35px] w-[35px] flex justify-center items-center hover:bg-background rounded-[100%]"></i>
        </div>
        <div className="hidden" id="comments">
          <hr className="w-full h-[2px] border-none bg-background my-[20px]" />
          <div className="flex justify-between items-center gap-1 mb-4">
            <img
              src="./images/img-1.jpg"
              alt=""
              className="w-[45px] h-[45px] rounded-[100%] object-cover"
            />
            <input
              type="text"
              placeholder="Add comment..."
              className="w-[75%] h-[40px] bg-background rounded-[20px] px-5 text-[14px] outline-none text-text"
            />
            <button className="w-[12%] h-[40px] bg-background text-title text-[13px] md:text-[14px] lg:text-[15px]  rounded-[20px] hover:text-white hover:bg-primary transition-colors duration-100">
              Add
            </button>
          </div>
          <div className="flex items-start gap-3 mb-3">
            <img
              src="./images/img-1.jpg"
              alt=""
              className="w-[40px] h-[40px] rounded-[100%] object-cover"
            />
            <div className="flex flex-col bg-background p-2 rounded-[12px]">
              <p className="text-title text-[14px]">Hussein Mohammed</p>
              <p className="text-text text-[13px]">Nice Post</p>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return <section className="w-full mt-5">{showPosts}</section>;
};

export default Posts;
