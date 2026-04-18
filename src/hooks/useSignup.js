import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../services/authService";

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,

    onSuccess: (data) => {
      const token = data?.token;

      if (!token) {
        toast.error("Signup failed: no token returned");
        return;
      }

      // Save token so the apiClient interceptor can attach it
      localStorage.setItem("truemind_token", token);

      // Seed the cache with the user returned from register
      if (data.user) {
        localStorage.setItem("truemind_user", JSON.stringify(data.user));
      }

      toast.success("Signup successful!");
      navigate("/signup/success");
    },

    onError: (error) => {
      const message = error?.response?.data?.message || "Signup failed. Please try again.";
      toast.error(message);
    },
  });
};
