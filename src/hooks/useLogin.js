import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useApp } from "../contexts/AppContext";
import { login } from "../services/authService";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useApp();

  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      // Seed the cache with the user returned from login
      // so components get the user instantly without waiting for a refetch
      if (data.user) {
        setUser(data.user); // Update user in context
      }

      toast.success("Login successful!");
      navigate("/dashboard");
    },

    onError: (error) => {
      const message = error?.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    },
  });
};
