import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const { isLogin, setIsLogin, login, getUser } = useContext(AuthContext);

  const submitLogin = async () => {
    const errorMessage = await login(identifier, password);
    if (errorMessage) {
      document.getElementById("loginError").classList.remove(["hidden"]);
    } else {
      getUser();
    }
  };
  return (
    <div className="flex flex-col bg-radial-[at_50%_75%] from-sky-100 via-blue-300 to-indigo-700 to-90% justify-center items-center w-[100%] h-dvh">
      <div className="flex flex-col bg-white justify-center items-center rounded-xl shadow-2xl p-2">
        <h2
          id="loginError"
          className="text-xl bg-red-500 text-white font-bold mt-12 p-2 rounded-lg hidden"
        >
          ایمیل یا نام کاربری یا رمز عبور اشتباه است
        </h2>
        <h1 className="text-4xl text-gray-800 font-bold mb-12 mt-12">
          ورود به سایت
        </h1>
        <form className="flex flex-col w-lg p-2">
          <input
            name="identifier"
            className="mb-8 mx-5 h-14 p-2 outline-0 pr-4 text-right border-gray-400 border-1 rounded-full"
            type="text"
            placeholder="ایمیل یا نام کاربری"
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <input
            name="password"
            className="mx-5 mb-2 h-14 p-2 outline-0 pr-4 text-right border-gray-400 border-1 rounded-full"
            type="text"
            placeholder="رمز عبور"
            onChange={(e) => setPassword(e.target.value)}
          />
          <a className="text-right text-sm font-semibold mb-5 pr-10" href="#">
            رمز عبور خود را فراموش کردید؟
          </a>
        </form>

        <button
          type="submit"
          onClick={() => submitLogin()}
          className="pb-2 text-xl text-white font-semibold bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 w-md h-14 rounded-full mt-6 mb-8 cursor-pointer "
        >
          ورود
        </button>
        <a className="text-right text-sm font-semibold pr-3 mb-8 " href="#">
          ثبت نام کنید
        </a>
      </div>
    </div>
  );
};
export default Login;
