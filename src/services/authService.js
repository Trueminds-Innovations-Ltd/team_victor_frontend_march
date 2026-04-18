import apiClient from "./apiClient";

export const register = async (data) => {
  const res = await apiClient.post("/register", data);
  return res.data;
};

export const login = async (data) => {
  const res = await apiClient.post("/login", data);
  const token = res.data.token || res.data.access_token;

  if (!token) {
    throw new Error(res.data.message || "Login failed");
  }

  localStorage.setItem("truemind_token", token);
  if (res.data.user) {
    localStorage.setItem("truemind_user", JSON.stringify(res.data.user));
  }

  return res.data;
};

export const getUser = async () => {
  const res = await apiClient.get("/user");

  if (res.data.user) {
    localStorage.setItem("truemind_user", JSON.stringify(res.data.user));
  }

  return res.data;
};

export const logout = () => {
  localStorage.removeItem("truemind_token");
  localStorage.removeItem("truemind_user");
};
