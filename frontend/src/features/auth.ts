import api from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import { LoginData } from "@/lib/types/auth";

export async function refreshToken() {
  useAuthStore.setState({ isLoading: true });
  const res = await api
    .post("api/auth/refresh/")
    .then(function response() {
      useAuthStore.setState({ isLoading: false });
    })
    .catch(function (e) {
      console.error(e);
    });

  useAuthStore.setState({ isLoading: false });
  return res;
}

export async function fetchUser() {
  useAuthStore.setState({ isLoading: true });
  const res = await api
    .get("api/auth/me/")
    .then(function response(response) {
      useAuthStore.setState({
        isLoading: false,
        isAuthenticated: true,
        user: response.data,
      });
      return response;
    })
    .catch(function (e) {
      console.error(e);
    });
  return res;
}

export async function login(data: LoginData) {
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
      return response;
    })
    .catch(function (e) {
      useAuthStore.setState({ isLoading: false, error: e.message });
      console.error(e);
      throw e;
    });
  return res;
}

export async function verifyLogin(): Promise<void> {
  useAuthStore.setState({ isLoading: true });
  const response = await fetchUser();
  if (response && response.status === 200) {
    useAuthStore.setState({ isLoading: false });
    return;
  }
  await refreshToken();
  await fetchUser();
  useAuthStore.setState({ isLoading: false });
}

export async function logOut() {
  const isAuthenticated = useAuthStore.getState().isAuthenticated;
  if (!isAuthenticated) {
    useAuthStore.setState({
      isLoading: false,
      isAuthenticated: false,
      user: null,
    });
    return;
  }
  await api
    .post("/api/auth/logout/")
    .then(function response() {
      useAuthStore.setState({
        isLoading: false,
        isAuthenticated: false,
        user: null,
      });
      window.location.reload();
    })
    .catch(function error(e) {
      console.error("Error logging out:", e);
    });

  return;
}
