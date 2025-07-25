import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/",
  withCredentials: true, // se estiver usando cookies (ex: refresh token HTTPOnly)
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Não autorizado, talvez o token expirou...");
      // Ex: redirecionar para login ou tentar refresh
    }
    return Promise.reject(error);
  },
);

export default api;
