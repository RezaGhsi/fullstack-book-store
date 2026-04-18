import React from "react";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useBooks } from "../context/BooksContext";

const BookCard = ({ book }) => {
  return (
    <Link to={`/book/${book.name.replaceAll(" ", "-")}`} draggable={false}>
      <div className="flex flex-col w-[245px] mt-1 rounded-xl cursor-pointer bg-white/50 backdrop-blur-2xl transition-shadow hover:shadow-md shadow-black/40 ">
        <img
          src="./img/bookImage.png"
          alt="book image"
          className="p-2 rounded-2xl"
          draggable={false}
        />
        <div className="text-right mb-2 mr-3">
          <h3 className="text-xl font-medium">{book.name}</h3>
          <h3 className="text-gray-600">دینو بوتزاتی</h3>
        </div>
        <h4
          className="text-blue-500 text-lg font-medium ml-4 text-left mb-3"
          dir="rtl"
        >
          <span className="px-1">{book.price.toLocaleString()}</span>
          <span>تومان</span>
        </h4>
      </div>
    </Link>
  );
};

export default BookCard;
