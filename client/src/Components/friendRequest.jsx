import React from "react";
import UserDetails from "./userDetails";
import { useDispatch, useSelector } from "react-redux";
import { acceptRequest, ignoreRequest } from "../Api/friendRequestApi";

const FriendRequest = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleAccept = (e) => {
    dispatch(acceptRequest(e));
  };

  const handleIgnore = (e) => {
    dispatch(ignoreRequest(e));
  };

  if (!user) {
    return (
      <div className="w-full h-[45px] flex justify-center">
        <span className="loader"></span>
      </div>
    ); //* Handle case when user data is not available
  }

  const showFriendRequests = user.friendRequests.map((friend) => {
    return (
      <div key={friend._id} className="flex items-center">
        <UserDetails
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

export default FriendRequest;
