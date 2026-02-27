import React from "react";
import { useState, useContext } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

const UserModal = () => {
  const { user, isLogin } = useContext(AuthContext);

  return (
    <div className="rounded-full mr-7">
      <Link to={`${isLogin ? "/me" : "/login"}`}>
        {user?.image ? (
          <img
            src={user.image}
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
