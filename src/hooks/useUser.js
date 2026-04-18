import { useState, useEffect } from "react";

export const useUser = () => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("truemind_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const raw = localStorage.getItem("truemind_user");
      setUser(raw ? JSON.parse(raw) : null);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return {
    user,
    setUser,
    isAuthenticated: !!user,
  };
};
