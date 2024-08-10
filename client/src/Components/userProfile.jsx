import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { getUser } from "../Api/userApi";

const UserProfile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);


  if (!user) {
    return (
      <div className="w-full md:w-[340px] flex justify-center items-center">
        <span className="loader"></span>
      </div>
    ); //* Handle case when user data is not available
  }

  return (
    <section className="top-0 md:top-[80px] bg-foreground h-[420px] w-[100%] p-[15px] md:w-[340px] rounded-[12px] md:sticky ">
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex gap-3 items-center">
          <Link>
            <img
              src={user.picturePath}
              alt=""
              className="w-[45px] h-[45px] rounded-[100%] object-cover"
            />
          </Link>
          <div className="">
            <Link className="text-title text-[15px] font-bold">
              {user.firstName} {user.lastName}
            </Link>
            <p className="text-text text-[13px]">
              {user.friends.length} friends
            </p>
          </div>
        </div>
        <i className="bx bx-user text-text text-[18px] cursor-pointer transition-colors duration-100 hover:text-primary"></i>
      </div>
      <hr className="h-[2px] border-none bg-background my-[15px]" />
      <div className="flex items-center gap-4 mb-[10px]">
        <i className="bx bx-map text-text text-[25px]"></i>
        <p className="text-text text-[13px]">{user.location}</p>
      </div>
      <div className="flex items-center gap-4">
        <i className="bx bx-briefcase text-text text-[24px]"></i>
        <p className="text-text text-[13px]">{user.occupation}</p>
      </div>
      <hr className="h-[2px] border-none bg-background my-[20px]" />
      <div className="flex items-center gap-4 mb-[10px] justify-between">
        <p className="text-text text-[13px]">Who's viewed your profile</p>
        <p className="text-title text-[13px]">{user.viewedProfile}</p>
      </div>
      <div className="flex items-center gap-4 mb-[10px] justify-between">
        <p className="text-text text-[13px]">Impression of your post</p>
        <p className="text-title text-[13px]">{user.impressions}</p>
      </div>
      <hr className="h-[2px] border-none bg-background my-[15px]" />
      <h1 className="text-title mb-[15px]">Social Profiles</h1>
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex gap-3 items-center">
          <Link>
            <i className="bx bxl-twitter text-text text-[25px]"></i>
          </Link>
          <div className="">
            <Link className="text-title text-[14px]">Twitter</Link>
            <p className="text-text text-[12px]">Social Network</p>
          </div>
        </div>
        <i className="bx bx-pencil text-title text-[20px] cursor-pointer transition-colors duration-100 hover:text-primary"></i>
      </div>
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex gap-3 items-center">
          <Link>
            <i className="bx bxl-instagram-alt text-text text-[25px]"></i>
          </Link>
          <div className="">
            <Link className="text-title text-[14px]">Instagram</Link>
            <p className="text-text text-[12px]">Social Network</p>
          </div>
        </div>
        <i className="bx bx-pencil text-title text-[20px] cursor-pointer transition-colors duration-100 hover:text-primary"></i>
      </div>
    </section>
  );
};

export default UserProfile;
