import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { isLogin, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (isLogin) return <Navigate to="/me" replace />;

  return children;
};

export default PublicRoute;
