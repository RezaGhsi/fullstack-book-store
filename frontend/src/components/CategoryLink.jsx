import { Link } from "react-router-dom";

const CategoryLink = ({ name }) => {
  return (
    <div>
      <Link className="flex font-medium text-lg text-neutral-700 bg-indigo-50 transition-colors hover:bg-white cursor-pointer p-1 pb-2 px-4 rounded-xl">
        {name}
      </Link>
    </div>
  );
};
export default CategoryLink;
