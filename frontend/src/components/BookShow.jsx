import { useRef, useState, useEffect } from "react";
import BookCard from "./BookCard";
import { FaAngleLeft, FaSpinner } from "react-icons/fa";
import { useBooks } from "../context/BooksContext";

const BookShow = ({ title, books = [] }) => {
  return (
    <div className="flex flex-col justify-around p-2 mb-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-right text-3xl font-bold mr-3">{title}</h2>
        <a
          href="/latest"
          className="flex items-center text-blue-500 ml-3"
          draggable={false}
        >
          <span className="text-sm font-medium ml-1">مشاهده همه</span>
          <i>
            <FaAngleLeft />
          </i>
        </a>
      </div>

      <div className="overflow-hidden select-none">
        <div className="flex right-1 w-[1300px] justify-around *:m-2 ">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookShow;
