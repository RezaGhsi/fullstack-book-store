import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
      setIsLogin(true);
    } catch (error) {
      setUser(null);
      setIsLogin(false);
    } finally {
      setIsLoadingUser(false);
    }
  };

  const login = async (identifier, password) => {
    try {
      await api.post("/auth/login", {
        identifier,
        password,
      });

      setIsLogin(true);
    } catch (error) {
      return error.response?.data?.message || "Login failed";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLogin,
        setIsLogin,
        isLoadingUser,
        setIsLoadingUser,
        login,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
