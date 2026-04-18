import Search from "./Search";
import Cart from "./Cart";
import UserModal from "./UserModal";
import DropDownList from "./DropDownList";
import { Link } from "react-router-dom";

const Header = ({ categories, authors }) => {
  return (
    <div className="flex justify-between top-0 sticky items-center z-50 h-20 w-full bg-white/10 backdrop-blur-lg shadow-sm ">
      <div className="flex h-[100%] items-center justify-between">
        <UserModal />
        <Link to="/">
          <img src="/img/Logo.png" alt="Logo" className="mr-19" />
        </Link>
      </div>
      <div className="flex h-[100%] items-center">
        <DropDownList name="دسته بندی ها" items={categories} />
        <DropDownList name="نویسنده ها" items={authors} />
      </div>
      <div className="flex justify-between">
        <Search />
        <Cart />
      </div>
    </div>
  );
};

export default Header;
