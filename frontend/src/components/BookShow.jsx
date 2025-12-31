import React from "react";
import BookCard from "./BookCard";
import { FaAngleLeft } from "react-icons/fa";

const BookShow = ({ title }) => {
  return (
    <div className="flex flex-col justify-around w-[100%] p-2 mb-6">
      <div className="flex justify-between mb-4">
        <a href="#" className="flex items-center text-blue-400 ml-3">
          <i>
            <FaAngleLeft />
          </i>
          <span className="text-sm font-medium ml-1">مشاهده همه</span>
        </a>
        <h2 className="text-right text-3xl font-bold mr-3">{title}</h2>
      </div>
      <div className="flex justify-around w-[100%] p-2">
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </div>
    </div>
  );
};

export default BookShow;
