import { useContext } from "react";
import { useAuth } from "../context/AuthContext";

import { FaSpinner } from "react-icons/fa";

const UserDashboard = () => {
  const { user, loading, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      <h1 className="text-4xl">{user.email}</h1>
      <button
        onClick={handleLogout}
        className="flex items-center text-5xl border-2 p-3 rounded-2xl m-10 transition-all bg-neutral-300 shadow-black/60 shadow-lg cursor-pointer active:bg-neutral-200 active:shadow-inner"
      >
        logout
      </button>
    </div>
  );
};
export default UserDashboard;
