import React from "react";
import UserDetails from "./userDetails";
import { useDispatch, useSelector } from "react-redux";
import { removeFriend } from "../Api/friendRequestApi";
import { useParams } from "react-router-dom";

const Friends = (props) => {
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

  const handleRemove = async (id) => {
    dispatch(removeFriend(id));
  };

  if (!user || userStatus === "loading" || postStatus === "loading") {
    return <div></div>;
  }

  const showFriends = user.friends.map((friend) => {
    return (
      <div key={friend._id} className="flex justify-between items-center">
        <UserDetails
          userId={friend._id}
          picturePath={friend.picturePath}
          firstName={friend.firstName}
          lastName={friend.lastName}
          location={friend.location}
        />
        {props.user === "userProfile" ? (
          myProfile._id === userId ? (
            <i
              className="bx bx-user-minus h-[35px] w-[35px] flex justify-center items-center rounded-[100%] text-text bg-background text-[20px] cursor-pointer translate-y-[-6px] transition-colors duration-100 hover:text-red-500"
              onClick={() => handleRemove(friend._id)}
            ></i>
          ) : (
            ""
          )
        ) : (
          <i
            className="bx bx-user-minus h-[35px] w-[35px] flex justify-center items-center rounded-[100%] text-text bg-background text-[20px] cursor-pointer translate-y-[-6px] transition-colors duration-100 hover:text-red-500"
            onClick={() => handleRemove(friend._id)}
          ></i>
        )}
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
