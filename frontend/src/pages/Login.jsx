import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);

  const { login, error, setError } = useAuth();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(form.identifier, form.password);
      navigate("/me");
    } catch (error) {
      setError("Login Failed");
    } finally {
      setLoading(false);
    }
    // const errorMessage = await login(identifier, password);
    // if (errorMessage) {
    //   document.getElementById("loginError").classList.remove(["hidden"]);
    // } else {
    //   getUser();
    // }
  };
  return (
    <div className="flex flex-col bg-radial-[at_50%_75%] from-sky-100 via-blue-300 to-indigo-700 to-90% justify-center items-center w-[100%] h-dvh">
      <div className="flex flex-col bg-white justify-center items-center rounded-xl shadow-2xl p-2">
        {error && (
          <h2
            id="loginError"
            className="text-xl bg-red-500 text-white font-bold mt-12 p-2 rounded-lg"
          >
            ایمیل یا نام کاربری یا رمز عبور اشتباه است
          </h2>
        )}

        <h1 className="text-4xl text-gray-800 font-bold mb-12 mt-12">
          ورود به سایت
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col w-lg p-2">
          <input
            name="identifier"
            value={form.identifier}
            className="mb-8 mx-5 h-14 p-2 outline-0 pr-4 text-right border-gray-400 border-1 rounded-full"
            type="text"
            placeholder="ایمیل یا نام کاربری"
            onChange={handleChange}
          />
          <input
            name="password"
            value={form.password}
            className="mx-5 mb-2 h-14 p-2 outline-0 pr-4 text-right border-gray-400 border-1 rounded-full"
            type="password"
            placeholder="رمز عبور"
            onChange={handleChange}
          />
          <a className="text-right text-sm font-semibold mb-5 pr-10" href="#">
            رمز عبور خود را فراموش کردید؟
          </a>
          <button
            disabled={loading}
            type="submit"
            className="pb-2 text-xl text-white font-semibold bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 w-md h-14 rounded-full mt-6 mb-8 cursor-pointer "
          >
            {loading ? "در حال ورود..." : "ورود"}
          </button>
        </form>

        <a className="text-right text-sm font-semibold pr-3 mb-8 " href="#">
          ثبت نام کنید
        </a>
      </div>
    </div>
  );
};
export default Login;
