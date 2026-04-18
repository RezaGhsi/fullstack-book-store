import Header from "./../components/Header";
import BookShow from "../components/BookShow";
import Banner from "../components/Banner";
import { useBooks } from "../context/BooksContext";
import { FaSpinner } from "react-icons/fa";

const Home = () => {
  const { latestBooks, loading } = useBooks();

  return (
    <div className="bg-linear-to-r from-indigo-300 via-indigo-200 to-indigo-300 ">
      <Header />
      <div className="flex justify-center">
        <div className="flex flex-col items-center w-7xl  border-black">
          <Banner />
          {loading ? (
            <FaSpinner className="text-8xl" />
          ) : (
            <BookShow title="کتاب های جدید" books={latestBooks} />
          )}

          {loading ? (
            <FaSpinner className="text-8xl" />
          ) : (
            <BookShow title="پرطرفدارها" books={latestBooks} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
