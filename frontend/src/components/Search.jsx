import { useEffect, useState } from "react";
import { FaRegWindowClose, FaSearch } from "react-icons/fa";
import { useDebouncedCallback } from "use-debounce";
import { useBooks } from "../context/BooksContext";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { searchBooks, getSearchBooks, loading } = useBooks();

  const debounceSearchTerm = useDebouncedCallback((value) => {
    if (value.length > 2) setSearchTerm(value);
  }, 1500);

  useEffect(() => {
    if (searchTerm.replaceAll(" ", "").length <= 2) return;

    const controller = new AbortController();

    const fetchData = async () => {
      await getSearchBooks(searchTerm);
    };
    fetchData();
    if (!loading) console.log(searchBooks);
    return () => {
      controller.abort();
    };
  }, [searchTerm]);

  return (
    <div className="flex items-center my-4 ml-12 w-sm h-12 bg-white rounded-full outline-2 outline-gray-900">
      <FaRegWindowClose
        className={`rotate-90 mr-3 ${searchTerm.length > 1 ? "visible" : "hidden"}`}
      />

      <input
        type="text"
        maxLength={20}
        placeholder="جستجو کنید"
        onChange={(e) => debounceSearchTerm(e.target.value)}
        className="flex flex-1 items-center h-[100%] text-lg font-medium outline-0 rounded-r-full text-right pr-6 "
      />
      <i
        onClick={() => setSearchTerm(searchTerm + " ")}
        className="mx-4 text-cyan-950 cursor-pointer"
      >
        <FaSearch />
      </i>
    </div>
  );
};

export default Search;
