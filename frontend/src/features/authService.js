import api from "../api/api";

export const loginService = async (identifier, password) => {
  const { data } = await api.post("/auth/login", { identifier, password });
  return data.user;
};

export const registerService = async (
  name,
  lastName,
  username,
  email,
  phone,
  password,
  confirmPassword,
) => {
  const { data } = await api.post("/auth/signup", {
    name,
    lastName,
    username,
    email,
    phone,
    password,
    confirmPassword,
  });
  return data;
};

export const logoutService = async () => {
  await api.post("/auth/logout");
};

export const getMeService = async () => {
  const { data } = await api.get("auth/me");
  return data.user;
};
