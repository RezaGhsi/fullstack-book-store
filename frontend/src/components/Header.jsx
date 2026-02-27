import React from "react";
import Search from "./Search";
import Cart from "./Cart";
import UserModal from "./UserModal";
import DropDownList from "./DropDownList";
import { Link } from "react-router-dom";

const Header = ({ categories, authors }) => {
  return (
    <div className="flex justify-between items-center h-20 w-[100%] bg-indigo-900">
      <div className="flex justify-between">
        <Cart />
        <Search />
      </div>

      <div className="flex h-[100%] items-center">
        <DropDownList name="نویسنده ها" items={authors} />
        <DropDownList name="دسته بندی ها" items={categories} />
      </div>
      <div className="flex h-[100%] items-center justify-between">
        <Link to="/">
          <img src="./img/Logo.png" alt="Logo" className="mr-19" />
        </Link>
        <UserModal />
      </div>
    </div>
  );
};

export default Header;
