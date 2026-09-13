import { createContext, useState } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load user safely from localStorage
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // LOGIN
  const login = async (form) => {
    const { data } = await API.post("/auth/login", form);

    // Backend returns id, fullName, email, token
    const loggedUser = {
      id: data.id,
      fullName: data.fullName,
      email: data.email,
    };

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(loggedUser));

    setUser(loggedUser);

    return loggedUser;
  };

  // REGISTER
  const register = async (form) => {
    const { data } = await API.post("/auth/register", form);
    return data;
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};