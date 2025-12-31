import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <Link to={""}>
      <div className="flex flex-col rounded-md cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-1 ">
        <img
          src="./img/bookImage.png"
          alt="book image"
          className="p-2 rounded-2xl"
        />
        <div className="text-right mb-2 mr-3">
          <h3 className="text-xl font-medium">بیابان تاتارها</h3>
          <h3 className="text-gray-600">دینو بوتزاتی</h3>
        </div>
        <h4 className="text-blue-400 font-medium ml-3 text-left mb-2" dir="rtl">
          <span className="text-right px-1">250,000</span>
          <span className="text-sm">تومان</span>
        </h4>
      </div>
    </Link>
  );
};

export default BookCard;
