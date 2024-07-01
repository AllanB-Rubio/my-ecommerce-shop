import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      {
        email,
        password,
      }
    );
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    setUser(user);
  };

  const register = async (userData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      userData
    );
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
