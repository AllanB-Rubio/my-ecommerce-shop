import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:3000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch user", error);
          localStorage.removeItem("token");
        });
    }
  }, []);

  const login = async (email, password) => {
    const response = await axios.post("http://localhost:3000/api/auth/login", {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    setUser(response.data.user);
  };

  const register = async (userData) => {
    const response = await axios.post(
      "http://localhost:3000/api/auth/register",
      userData
    );
    localStorage.setItem("token", response.data.token);
    setUser(response.data.user);
  };

  const logout = (callback) => {
    localStorage.removeItem("token");
    setUser(null);
    if (callback) {
      callback();
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
