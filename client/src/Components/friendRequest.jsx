import React from "react";
import UserDetails from "./userDetails";
import { useDispatch, useSelector } from "react-redux";
import { acceptRequest, ignoreRequest } from "../Api/friendRequestApi";
import { useParams } from "react-router-dom";

const FriendRequest = (props) => {
  const { userId } = useParams();
  const user = useSelector((state) =>
    props.user === "userProfile"
      ? state.userProfile.userProfile
      : state.user.user
  );
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.user.user);
  const userStatus = useSelector((state) => state.user.status);
  const postStatus = useSelector((state) => state.post.status);

  const handleAccept = (e) => {
    dispatch(acceptRequest(e));
  };

  const handleIgnore = (e) => {
    dispatch(ignoreRequest(e));
  };

  if (!user || userStatus === "loading" || postStatus === "loading") {
    return <div></div>;
  }

  const showFriendRequests = user.friendRequests.map((friend) => {
    return (
      <div key={friend._id} className="flex items-center">
        <UserDetails
          userId={friend._id}
          picturePath={friend.picturePath}
          firstName={friend.firstName}
          lastName={friend.lastName}
          location={friend.location}
        />
        <i
          className="bx bx-check h-[35px] w-[35px] flex justify-center items-center rounded-[100%] text-text bg-background text-[20px] cursor-pointer translate-y-[-6px] ml-[40px] mr-[5px] transition-colors duration-100 hover:text-green-600"
          onClick={() => handleAccept(friend._id)}
        ></i>
        <i
          className="bx bx-x h-[35px] w-[35px] flex justify-center items-center rounded-[100%] text-text bg-background text-[20px] cursor-pointer translate-y-[-6px] transition-colors duration-100 hover:text-red-600"
          onClick={() => handleIgnore(friend._id)}
        ></i>
      </div>
    );
  });

  const container = () => {
    return (
      <section className="sticky top-[470px] bottom-0 bg-foreground w-[95%] max-h-[30dvh] p-[15px] md:w-[340px] min-w-[300px] rounded-[12px] overflow-hidden hover:overflow-y-scroll scrollHidden hidden flex-col xl:flex">
        <div className="flex justify-between items-center">
          <h1 className="text-title">Friend Requests</h1>
          <p className="text-text">{user.friendRequests.length}</p>
        </div>
        <hr className="w-full h-[2px] border-none bg-background my-[20px]" />
        {showFriendRequests}
      </section>
    );
  };

  return userId !== undefined
    ? userId === myProfile._id
      ? container()
      : ""
    : container();
};

export default FriendRequest;
