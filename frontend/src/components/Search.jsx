import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDebouncedCallback } from "use-debounce";

const { VITE_API_URL } = import.meta.env;

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);

  const debounceSearchTerm = useDebouncedCallback((value) => {
    if (value.length > 2) setSearchTerm(value);
  }, 1500);

  useEffect(() => {
    if (searchTerm.length <= 2) return;

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await axios.post(`${VITE_API_URL}/search`, {
          params: { q: searchTerm },
          signal: controller.signal,
        });

        const data = res.data;

        // if (data.success === false) {

        // }

        setBooks(data.books);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error(err);
      }
    };
    fetchData();

    return () => {
      setBooks([]);
      controller.abort();
    };
  }, [searchTerm]);

  return (
    <div className="flex items-center my-4 ml-12 w-sm h-12 bg-white rounded-full outline-2 outline-gray-900">
      <i className="mx-4 text-cyan-950 cursor-pointer">
        <FaSearch />
      </i>
      <input
        type="text"
        placeholder="جستجو کنید"
        onChange={(e) => debounceSearchTerm(e.target.value)}
        className="flex flex-1 items-center h-[100%] text-lg font-medium outline-0 rounded-r-full text-right pr-5 "
      />
    </div>
  );
};

export default Search;
