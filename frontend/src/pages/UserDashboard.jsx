import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import { FaSpinner } from "react-icons/fa";

const UserDashboard = () => {
  const { user, isLogin, isLoadingUser } = useContext(AuthContext);

  // if (isLoadingUser)
  //   return (
  //     <h1>
  //       <FaSpinner />
  //     </h1>
  //   );

  // if (user && isLogin && !isLoadingUser) return <h1>{user.email}</h1>;
  return (
    <div>
      <h1>{user && isLogin && !isLoadingUser ? user.email : <FaSpinner />}</h1>
    </div>
  );
};
export default UserDashboard;
