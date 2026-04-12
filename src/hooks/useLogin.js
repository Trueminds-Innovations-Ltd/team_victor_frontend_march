import { useMutation } from "@tanstack/react-query";
import { login } from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      const token = data?.token || data?.access_token;
      console.log("Received token:", token);

      if (!token) {
        toast.error("Invalid login response");
        return;
      }

      localStorage.setItem("truemind_token", token);
      localStorage.setItem("truemind_user", JSON.stringify(data.user || {}));
      toast.success("Login successful!");
      navigate("/dashboard");
    },

    onError: () => {
      toast.error("Login failed. Please try again.");
    },
  });
};
