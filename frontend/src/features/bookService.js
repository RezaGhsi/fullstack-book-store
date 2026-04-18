import api from "../api/api";

export const getAllBooksService = async () => {
  const { data } = await api.get("/book");
  return data;
};

export const getBookByNameService = async (name) => {
  const { data } = await api.get(`/book/name/${name}`);
  return data;
};

export const createBookService = async ({
  name,
  price,
  releaseDate,
  author,
  category,
}) => {
  const { data } = await api.post("/book");
  return data;
};

export const deleteBookService = async (id) => {
  const { data } = await api.delete(`/book/${id}`);
  return data;
};

export const getBooksPageService = async (pageNumber) => {
  const { data } = await api.get(`/book/page/${pageNumber}`);
  return data;
};

export const searchBooksService = async (searchTerm) => {
  const { data } = await api.post(`/book/search/${searchTerm}`);
  return data;
};
