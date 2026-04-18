import { useState, useEffect, useRef } from "react";
import { FaAngleDown, FaArrowDown } from "react-icons/fa";

const DropDownList = ({
  name = "دسته بندی ها",
  items = ["فلسفی", "علمی", "رمان"],
}) => {
  const [open, setOpen] = useState(false);

  const boxRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={boxRef} className="flex flex-col items-center ">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-46 h-14 px-4 pr-7 mx-2 cursor-pointer text-lg font-medium text-neutral-700 bg-indigo-50 transition-colors hover:bg-white rounded-2xl"
      >
        <p className=" select-none">{name}</p>

        <i
          className={`px-2 transition-transform duration-100 ${open ? "rotate-180" : ""} `}
        >
          <FaAngleDown />
        </i>
      </div>

      <div
        className={`absolute flex flex-col py-3 items-center mt-16 text-neutral-700 bg-indigo-100/90 backdrop-blur-2xl  text-md font-medium w-46 rounded-lg ${open ? "" : "hidden"}`}
      >
        <ul className="flex flex-col items-center justify-around w-full">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex justify-center select-none mb-1 p-2 w-40 cursor-pointer rounded-xl transition-colors hover:bg-white"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropDownList;
