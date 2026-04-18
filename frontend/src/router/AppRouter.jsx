import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import UserDashboard from "../pages/UserDashboard";
import PublicRoute from "../components/PublicRoute";
import PrivateRoute from "../components/PrivateRoute";
import { AuthProvider } from "../context/AuthContext";
import { BooksProvider } from "../context/BooksContext";
import LatestBooks from "../pages/LatestBooks";
import BookPage from "../pages/BookPage";
import { CategoryProvider } from "../context/CategoryContext";
import Category from "../pages/Category";

const AppRouter = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <BooksProvider>
                <Home />
              </BooksProvider>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/me"
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/latest"
            element={
              <BooksProvider>
                <LatestBooks />
              </BooksProvider>
            }
          />

          <Route
            path={`/book/:bookName`}
            element={
              <BooksProvider>
                <BookPage />
              </BooksProvider>
            }
          />

          <Route
            path="/category"
            element={
              <CategoryProvider>
                <Category />
              </CategoryProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
export default AppRouter;
