import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getAllCategoriesService,
  createCategoryService,
} from "../features/categoryService";

const CategoryContext = createContext(null);

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { categories } = await getAllCategoriesService();
        setCategories(categories);
      } catch (error) {
        setCategories(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const createCategory = useCallback(async (name) => {
    try {
      setLoading(true);
      return await createCategoryService(name);
    } finally {
      setLoading(false);
    }
  });

  const value = { categories, createCategory, loading };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context)
    throw new Error("useBooks Should be Used Only In BooksProvider");
  return context;
};
