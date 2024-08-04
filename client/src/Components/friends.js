import React from "react";
import UserDetails from "./userDetails";
import Cookies from "universal-cookie";

const Friends = () => {
  const cookies = new Cookies();
  const user = cookies.get("user");

  const showFriends = user.friends.map((friend) => {
    <UserDetails
      picturePath={friend.picturePath}
      firstName={friend.firstName}
      lastName={friend.lastName}
      occupation={friend.occupation}
    />;
  });

  return (
    <section className="fixed top-[550px] bg-foreground w-[95%] h-[150px] p-[20px] lg:w-[23%] rounded-[12px] overflow-y-hidden hover:overflow-y-scroll">
      <div className="flex justify-between items-center">
        <h1 className="text-title">Friends</h1>
        <p className="text-text">{user.friends.length}</p>
      </div>
      <hr className="h-[2px] border-none bg-background my-[20px]" />
      <UserDetails
        picturePath="./images/img-1.jpg"
        firstName="Hussein"
        lastName="Mohammed"
        occupation="Software Engineering"
      />
      <UserDetails
        picturePath="./images/img-1.jpg"
        firstName="Hussein"
        lastName="Mohammed"
        occupation="Software Engineering"
      />
      {showFriends}
    </section>
  );
};

export default Friends;
