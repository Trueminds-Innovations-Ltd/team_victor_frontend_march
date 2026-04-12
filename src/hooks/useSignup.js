import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useSignup = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: register,

    onSuccess: (data) => {
      const token = data?.token;

      if (token) {
        localStorage.setItem("truemind_token", token);

        toast.success("Signup successful!");

        navigate("/dashboard");
      } else {
        toast.error("Signup failed: no token returned");
      }
    },

    onError: () => {
      toast.error("Signup failed. Please try again.");
    },
  });
};
