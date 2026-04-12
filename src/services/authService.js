import apiClient from "./apiClient";

export const register = async (data) => {
  const res = await apiClient.post("/register", data);
  return res.data;
};

export const login = async (data) => {
  const res = await apiClient.post("/login", data);

  console.log("login response", res.data);

  const token = res.data.token || res.data.access_token;

  if (!token) {
    throw new Error(res.data.message || "Login failed");
  }

  // localStorage.setItem("truemind_token", token);

  return res.data;
};

export const logout = () => {
  localStorage.removeItem("truemind_token");
  localStorage.removeItem("truemind_user");
};
