import React from "react";
import Header from "./../components/Header";
import BookShow from "../components/BookShow";
import Banner from "../components/Banner";

const Home = () => {
  return (
    <div className="">
      <Header />
      <div className="flex justify-center">
        <div className="flex flex-col items-center w-7xl  border-black">
          <Banner />
          <BookShow title="کتاب های جدید" />
          <BookShow title="پرطرفدارها" />
        </div>
      </div>
    </div>
  );
};

export default Home;
