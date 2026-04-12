import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

export const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");

    if (confirmed) {
      logout();
      navigate("/signin");
    }
  };

  return handleLogout;
};
