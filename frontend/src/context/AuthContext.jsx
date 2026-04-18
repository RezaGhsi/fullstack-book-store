import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import {
  loginService,
  registerService,
  logoutService,
  getMeService,
} from "./../features/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await getMeService();
        setUser(user);
        // setIsLogin(true);
      } catch (error) {
        setUser(null);
        // setIsLogin(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = useCallback(async (identifier, password) => {
    setError(null);
    try {
      const user = await loginService(identifier, password);
      setUser(user);
      return user;
      // setIsLogin(true);
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      setError(message);
      throw error;
    }
  }, []);

  const register = useCallback(async (userInfo) => {
    setError(null);
    try {
      const data = await registerService(...userInfo);
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Register failed";
      setError(message);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutService();
    } finally {
      setUser(null);
    }
  }, []);

  const value = {
    user,
    loading,
    error,
    setError,
    setLoading,
    login,
    register,
    logout,
    isLogin: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth Should be Used Only In AuthProvider");
  return context;
};
