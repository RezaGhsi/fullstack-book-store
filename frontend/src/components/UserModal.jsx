import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserModal = ({ name, profilePic }) => {
  return (
    <div className="rounded-full mr-7">
      <Link to={`/me`}>
        {profilePic ? (
          <img
            src={profilePic}
            alt={name}
            className="w-[60px] h-[60px] rounded-full"
          />
        ) : (
          <FaRegUserCircle className="text-6xl text-white" />
        )}
      </Link>
    </div>
  );
};

export default UserModal;
