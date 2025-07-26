import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/",
  withCredentials: true, // se estiver usando cookies (ex: refresh token HTTPOnly)
});

export default api;
