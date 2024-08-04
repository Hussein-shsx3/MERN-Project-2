import React from "react";
import { Link } from "react-router-dom";

const UserDetails = ( props ) => {
  return (
    <div className="flex gap-3 items-center mb-[16px]">
      <Link>
        <img
          src={`${props.picturePath}`}
          alt=""
          className="w-[50px] h-[50px] rounded-[100%]"
        />
      </Link>
      <div className="">
        <Link className="text-title text-[15px] font-bold">
          {props.firstName} {props.lastName}
        </Link>
        <p className="text-text text-[13px]">{props.occupation}</p>
      </div>
    </div>
  );
};

export default UserDetails;
