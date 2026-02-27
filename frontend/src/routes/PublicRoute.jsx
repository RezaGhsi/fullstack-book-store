import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { user, isLoadingUser } = useContext(AuthContext);

  if (isLoadingUser) return <p>Loading...</p>;

  if (user) return <Navigate to="/me" />;

  return children;
};

export default PublicRoute;
