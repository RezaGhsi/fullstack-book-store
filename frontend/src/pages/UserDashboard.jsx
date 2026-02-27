import { useContext } from "react";
import { useAuth } from "../context/AuthContext";

import { FaSpinner } from "react-icons/fa";

const UserDashboard = () => {
  const { user, loading, logout } = useAuth();

  // if (isLoadingUser)
  //   return (
  //     <h1>
  //       <FaSpinner />
  //     </h1>
  //   );

  // if (user && isLogin && !isLoadingUser) return <h1>{user.email}</h1>;
  return (
    <div>
      <h1 className="text-4xl">{user.email}</h1>
    </div>
  );
};
export default UserDashboard;
