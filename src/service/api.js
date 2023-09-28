import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const loginUser = async (email, password) => {
  let url = `/login`;
  return api.post(url, {
    email: email,
    password: password,
  });
};
export const createUser = async (email, password, adm) => {
  let url = `/user`;
  return api.post(url, {
    email: email,
    password: password,
    adm: adm,
  });
};

export const imagensApi = async () => {
  let url = `/imagens`;
  return api.get(url);
};

export const uploadImagem = async (titulo, texto, img) => {
  let url = `/imagens`;
  return api.post(url, { titulo: titulo, texto: texto, img: img });
};
