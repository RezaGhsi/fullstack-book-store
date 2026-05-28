import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import {
  getAllBooksService,
  getBookByNameService,
  createBookService,
  deleteBookService,
  getBooksPageService,
  searchBooksService,
} from "./../features/bookService";
import { AuthProvider } from "./AuthContext";

const BooksContext = createContext(null);

export const BooksProvider = ({ children }) => {
  const [latestBooks, setLatestBooks] = useState(null);
  const [searchBooks, setSearchBooks] = useState(null);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getHomePageBooks = async () => {
      try {
        const { books } = await getBooksPageService(1);
        setLatestBooks(books);
      } catch (error) {
        setLatestBooks(null);
      } finally {
        setLoading(false);
      }
    };

    getHomePageBooks();
  }, []);

  const getBookByName = useCallback(async (name) => {
    try {
      setLoading(true);
      const { book } = await getBookByNameService(name);
      setBook(book);
    } catch (error) {
      setBook(null);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getLatestBooksPage = useCallback(async (pageNumber) => {
    try {
      setLoading(true);
      const { books } = await getBooksPageService(pageNumber);
      setLatestBooks(books);
    } catch (error) {
      setLatestBooks(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const getSearchBooks = useCallback(async (searchTerm) => {
    try {
      searchTerm = searchTerm.trim();
      setLoading(true);
      const { books } = await searchBooksService(searchTerm);
      setSearchBooks(books);
    } catch (error) {
      setSearchBooks(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    latestBooks,
    loading,
    book,
    searchBooks,
    error,
    getBookByName,
    getLatestBooksPage,
    getSearchBooks,
  };

  return (
    <BooksContext.Provider value={value}>{children}</BooksContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context)
    throw new Error("useBooks Should be Used Only In BooksProvider");
  return context;
};
