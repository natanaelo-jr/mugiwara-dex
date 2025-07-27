import api from "@/lib/api";
import { AxiosResponse } from "axios";
import { useAuthStore } from "@/store/auth";
import { LoginData } from "@/lib/types/auth";

export async function refreshToken() {
  useAuthStore.setState({ isLoading: true });
  const res = await api
    .post("api/auth/refresh/")
    .then(function response(response) {
      console.log(response);
    })
    .catch(function (e) {
      console.error(e);
    });
  return res;
}

export async function fetchUser() {
  console.log("Fetch user:");
  useAuthStore.setState({ isLoading: true });
  const res = await api
    .get("api/auth/me/")
    .then(function response(response) {
      useAuthStore.setState({
        isLoading: false,
        isAuthenticated: true,
        user: response.data,
      });
      console.log(useAuthStore.getState());
      return response.status;
    })
    .catch(function (e) {
      console.error(e);
    });
  return res;
}

export async function login(
  data: LoginData,
): Promise<AxiosResponse<any> | void> {
  console.log("Login:");
  useAuthStore.setState({ isLoading: true, error: null });
  const res = await api
    .post("/api/auth/login/", data)
    .then(function response(response) {
      fetchUser();
      useAuthStore.setState({
        isLoading: false,
        isAuthenticated: true,
      });
      console.log("retornando", response);
      return response;
    })
    .catch(function (e) {
      useAuthStore.setState({ isLoading: false, error: e.message });
      console.log(useAuthStore.getState());
      console.error(e);
      throw e;
    });
  return res;
}

export async function verifyLogin(): Promise<void> {
  useAuthStore.setState({ isLoading: true });
  const mestatus = await fetchUser();
  if (mestatus === 200) {
    return;
  }
  await refreshToken();
  await fetchUser();
}
