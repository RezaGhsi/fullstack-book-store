import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div>
      <img
        draggable={false}
        src="/img/Banner.png"
        alt="banner"
        className="rounded-xl my-8 mb-12"
      />
    </div>
  );
};

export default Banner;
