import React from "react";
import { FaAngleDown, FaArrowDown } from "react-icons/fa";

const DropDownList = ({ name = "دسته بندی ها", items = [] }) => {
  return (
    <div className="flex items-center justify-between h-[75%] px-6 pr-7 cursor-pointer text-md font-medium hover:bg-gray-500 text-white rounded-full">
      <i className="pr-2">
        <FaAngleDown />
      </i>
      <p>{name}</p>
    </div>
  );
};

export default DropDownList;
