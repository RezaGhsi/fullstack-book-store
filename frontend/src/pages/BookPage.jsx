import { useNavigate, useParams } from "react-router-dom";
import Header from "./../components/Header";
import CategoryLink from "../components/CategoryLink";
import { useEffect } from "react";
import { useBooks } from "../context/BooksContext";
import Page404 from "./Page404";
import { FaSpinner } from "react-icons/fa";
const BookPage = () => {
  const { bookName } = useParams();
  const parsedBookName = bookName.replaceAll("-", " ");

  const { loading, getBookByName, book, error } = useBooks();

  useEffect(() => {
    getBookByName(parsedBookName);
  }, []);

  if (error && error.status === 404) {
    return <Page404 />;
  }

  if (loading || !book) {
    return <FaSpinner className="text-4xl" />;
  }

  return (
    !loading && (
      <div className="flex flex-col items-center bg-linear-to-r from-indigo-300 via-indigo-200 to-indigo-300">
        <Header />
        <div className="flex justify-between w-[80dvw] my-10">
          <div className="flex flex-col w-[55dvw] text-xl m-4">
            <h1 className="text-5xl font-medium mb-10">{book.name}</h1>
            <p className="text-xl ml-10 mb-10">
              روایت این اثر پس از نبرد ویرانگر میان «گودزیلا» و «تایتان‌ها»
              جریان دارد؛ نبردی که به جهانیان ثابت کرد هیولاها واقعیت دارند. در
              این بستر، داستانِ سفر ماجراجویانه یک خانواده را دنبال می‌کنیم که
              در تلاش‌اند تا پرده از رازهای مدفون گذشته‌ی خود بردارند و به
              میراثی پی ببرند که آن‌ها را به سازمان مخفی و مرموز «مونارک» پیوند
              می‌دهد.
            </p>
            <div className="flex *:ml-3 mb-10">
              <h3 className="text-lg">ژانر : </h3>
              <CategoryLink name="رمان" />
              <CategoryLink name="فلسفی" />
              <CategoryLink name="روان شناختی" />
              {/* {book.categoires.map((category) => (
              <a href={`/category/${category.name.replace(" ", "-")}`}>
                {category.name}
              </a>
            ))} */}
            </div>
            <div className="flex mb-20 *:ml-3">
              <h3 className="text-lg">نویسنده : </h3>
              <a
                href="#"
                className="hover:text-indigo-500 active:text-indigo-800 "
              >
                دینو بوتزاتی
              </a>
            </div>
            <div className="flex justify-end text-left *:text-2xl">
              <h3>قیمت : </h3>
              <h4
                className="text-blue-500 text-lg font-medium ml-4 text-left mb-3"
                dir="rtl"
              >
                <span className="px-1">{book.price.toLocaleString()}</span>
                <span>تومان</span>
              </h4>
            </div>
          </div>
          <img
            src="/img/bookImage.png"
            alt="bookImage"
            className="w-[18dvw] mt-5 rounded-2xl"
          />
        </div>
      </div>
    )
  );
};
export default BookPage;
