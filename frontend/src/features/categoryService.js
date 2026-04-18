import api from "./../api/api";

export const createCategoryService = async (name) => {
  const { data } = await api.post("/category", { name });
  return data;
};

export const getAllCategoriesService = async () => {
  const { data } = await api.get("/category");
  return data;
};
