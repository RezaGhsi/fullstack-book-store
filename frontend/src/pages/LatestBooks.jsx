import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Header from "../components/Header";
import { useBooks } from "../context/BooksContext";
import BookCard from "../components/BookCard";
import { FaSpinner } from "react-icons/fa";

const LatestBooks = () => {
  const { latestBooks, getLatestBooksPage, loading } = useBooks();
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    const handlePage = async (pageNumber) => {
      await getLatestBooksPage(pageNumber);
    };
    handlePage();
  }, []);

  if (loading) {
    return <FaSpinner />;
  }
  return (
    <div className="bg-linear-to-r from-indigo-300 via-indigo-200 to-indigo-300">
      <Header />
      <div className="flex justify-center">
        <div className="flex flex-wrap mt-20 *:p-2 items-center w-[1320px] border-black">
          {latestBooks.map((book) => (
            <BookCard book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default LatestBooks;
