import React from "react";
import UserDetails from "./userDetails";
import { useDispatch, useSelector } from "react-redux";
import { removeFriend } from "../Api/friendRequestApi";

const Friends = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleRemove = async (id) => {
    dispatch(removeFriend(id));
  };

  if (!user) {
    return <div></div>; //* Handle case when user data is not available
  }

  const showFriends = user.friends.map((friend) => {
    return (
      <div key={friend._id} className="flex justify-between items-center">
        <UserDetails
          picturePath={friend.picturePath}
          firstName={friend.firstName}
          lastName={friend.lastName}
          location={friend.location}
        />
        <i
          className="bx bx-user-minus h-[35px] w-[35px] flex justify-center items-center rounded-[100%] text-text bg-background text-[20px] cursor-pointer translate-y-[-6px] transition-colors duration-100 hover:text-red-500"
          onClick={() => handleRemove(friend._id)}
        ></i>
      </div>
    );
  });

  return (
    <section className="relative md:sticky my-3 md:my-0 top-none md:top-[509px] bg-foreground w-[100%] max-h-[30dvh] p-[15px] lg:w-[340px] min-w-[300px] rounded-[12px] overflow-hidden hover:overflow-y-scroll scrollHidden flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-title">Friend List</h1>
        <p className="text-text">{user.friends.length}</p>
      </div>
      <hr className="w-full h-[2px] border-none bg-background my-[20px]" />
      {showFriends}
    </section>
  );
};

export default Friends;
