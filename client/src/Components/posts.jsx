import React, { useEffect, useState } from "react";
import UserDetails from "./userDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPosts,
  getUserPosts,
  likeToogle,
  createComment,
  deletePost,
} from "../Api/postsApi";
import { sendRequest, removeFriend } from "../Api/friendRequestApi";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Posts = (props) => {
  const { userId } = useParams();

  const dispatch = useDispatch();
  const posts = useSelector((state) =>
    props.postType === "allPosts" ? state.post.allPosts : state.post.userPosts
  );
  const user = useSelector((state) => state.user.user);
  const userStatus = useSelector((state) => state.user.status);
  const postStatus = useSelector((state) => state.post.status);

  const [commentData, setCommentData] = useState({
    postId: "",
    text: "",
  });

  useEffect(() => {
    props.postType === "allPosts"
      ? dispatch(getAllPosts())
      : dispatch(getUserPosts(userId));
  }, [dispatch, props.postType, userId]);

  const addFriend = (friendId) => {
    dispatch(sendRequest(friendId));
  };

  const removeMyFriend = (friendId) => {
    dispatch(removeFriend(friendId));
  };

  const deleteThePost = (postId) => {
    dispatch(deletePost(postId));
  };

  const likeToogles = (postId,e) => {
    e.preventDefault();
    dispatch(likeToogle(postId));
  };

  const commentToggle = (postId) => {
    document.getElementById(`comments-${postId}`).classList.toggle("hidden");
  };

  const commentPost = (e) => {
    e.preventDefault();
    dispatch(createComment(commentData));
  };

  if (!user || !posts || userStatus === "loading" || postStatus === "loading") {
    return <div></div>;
  }

  const showPosts = posts.map((post) => {
    const showComments = post.comments.map((comment) => {
      return (
        <div className="flex items-start gap-3 mb-3" key={comment._id}>
          <Link to={`/profile/${comment.user._id}`}>
            <img
              src={comment.user.picturePath}
              alt=""
              className="w-[40px] h-[40px] rounded-[100%] object-cover"
            />
          </Link>
          <div className="flex flex-col bg-background p-2 rounded-[12px]">
            <Link to={`/profile/${comment.user._id}`}>
              <p className="text-title text-[14px]">
                {comment.user.firstName} {comment.user.lastName}
              </p>
            </Link>
            <p className="text-text text-[13px]">{comment.text}</p>
          </div>
        </div>
      );
    });
    return (
      <div
        className="flex flex-col mb-5 bg-foreground rounded-[12px] py-[20px] px-[15px]"
        key={post._id}
      >
        <div className="flex items-center justify-between">
          <UserDetails
            userId={post.user._id}
            picturePath={post.user.picturePath}
            firstName={post.user.firstName}
            lastName={post.user.lastName}
            location={post.user.location}
          />
          {user._id === post.user._id ? (
            <i
              className="bx bx-message-alt-x text-text h-[35px] w-[35px] flex justify-center items-center rounded-[100%] bg-background text-[20px] cursor-pointer translate-y-[-6px] transition-colors duration-100 hover:text-title"
              onClick={() => deleteThePost(post._id)}
            ></i>
          ) : post.user.friends.includes(user._id) ? (
            <i
              className="bx bx-user-minus text-text h-[35px] w-[35px] flex justify-center items-center rounded-[100%] bg-background text-[20px] cursor-pointer translate-y-[-6px] transition-colors duration-100 hover:text-title"
              onClick={() => removeMyFriend(post.user._id)}
            ></i>
          ) : (
            <i
              className="bx bx-user-plus text-text h-[35px] w-[35px] flex justify-center items-center rounded-[100%] bg-background text-[20px] cursor-pointer translate-y-[-6px] transition-colors duration-100 hover:text-title"
              onClick={() => addFriend(post.user._id)}
            ></i>
          )}
        </div>
        <p className="text-text text-[14px] ">{post.description}</p>
        <img
          src={post.postImage}
          alt=""
          className="w-full my-3 object-cover rounded-[8px]"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <i
              className={`bx bxs-heart text-[20px] cursor-pointer h-[35px] w-[35px] flex justify-center items-center hover:bg-background rounded-[100%] transition-colors duration-75 ${
                post.likes.includes(user._id) ? "text-red-700" : "text-text"
              } `}
              onClick={() => likeToogles(post._id)}
            ></i>
            <p className="text-text text-[14px]">{post.likes.length}</p>
            <i
              className="bx bxs-comment text-text text-[20px] cursor-pointer h-[35px] w-[35px] flex justify-center items-center hover:bg-background rounded-[100%]"
              onClick={() => commentToggle(post._id)}
            ></i>
            <p className="text-text text-[14px]">{post.comments.length}</p>
          </div>
          <i className="bx bxs-share-alt text-text text-[20px] cursor-pointer h-[35px] w-[35px] flex justify-center items-center hover:bg-background rounded-[100%]"></i>
        </div>
        <div className="hidden" id={`comments-${post._id}`}>
          <hr className="w-full h-[2px] border-none bg-background my-[20px]" />
          <form
            className="flex justify-between items-center gap-1 mb-4"
            onSubmit={commentPost}
          >
            <img
              src="./images/img-1.jpg"
              alt=""
              className="w-[45px] h-[45px] rounded-[100%] object-cover"
            />
            <input
              type="text"
              placeholder="Add comment..."
              required
              onChange={(e) =>
                setCommentData({ postId: post._id, text: e.target.value })
              }
              className="w-[75%] h-[40px] bg-background rounded-[20px] px-5 text-[14px] outline-none text-text"
            />
            <button className="w-[12%] h-[40px] bg-background text-title text-[13px] md:text-[14px] lg:text-[15px]  rounded-[20px] hover:text-white hover:bg-primary transition-colors duration-100">
              Add
            </button>
          </form>
          {showComments}
        </div>
      </div>
    );
  });

  return (
    <section className="w-full flex flex-col-reverse">{showPosts}</section>
  );
};

export default Posts;
