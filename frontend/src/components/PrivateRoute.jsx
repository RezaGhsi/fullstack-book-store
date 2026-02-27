import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isLogin, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!isLogin) return <Navigate to="/login" replace />;

  return children;
};

export default PrivateRoute;
