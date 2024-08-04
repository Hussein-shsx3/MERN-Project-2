import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../Api/userApi";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const UserProfile = () => {
  const dispatch = useDispatch();
  const cookies = new Cookies();

  const user = cookies.get("user");

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <section className="fixed bg-foreground w-[95%] h-[450px] p-[20px] lg:w-[23%] rounded-[12px]">
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex gap-3 items-center">
          <Link>
            <img
              src={user.picturePath}
              alt=""
              className="w-[50px] h-[50px] rounded-[100%]"
            />
          </Link>
          <div className="">
            <Link className="text-title text-[15px] font-bold">
              {user.firstName} {user.lastName}
            </Link>
            <p className="text-text text-[13px]">{user.friends.length} friends</p>
          </div>
        </div>
        <i className="bx bx-user text-text text-[18px] cursor-pointer transition-colors duration-100 hover:text-primary"></i>
      </div>
      <hr className="h-[2px] border-none bg-background my-[20px]" />
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
      <hr className="h-[2px] border-none bg-background my-[20px]" />
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
