import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const apiURL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_URL_PRODUCTION
      : import.meta.env.VITE_API_URL_LOCAL;

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${apiURL}/api/auth/login`, {
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      setUser(user);
    } catch (error) {
      console.error("Login request data:", { email, password });
      console.error("Login error:", error.response || error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(
        `${apiURL}/api/auth/register`,
        userData
      );
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      setUser(user);
    } catch (error) {
      if (
        error.response &&
        error.response.status === 500 &&
        error.response.data.error.includes(
          "duplicate key value violates unique constraint"
        )
      ) {
        console.error("Username already exists:", userData.username);
        throw new Error("Username already exists");
      }
      console.error("Register request data:", userData);
      console.error("Register error:", error.response || error);
      throw error;
    }
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
