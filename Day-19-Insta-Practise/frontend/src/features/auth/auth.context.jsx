import { useState } from "react";
import { createContext } from "react";
import { login, register } from "./services/auth.api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  //Login handler

  const handleLogin = async (username, password) => {
    setLoading(true);

    try {
      const res = await login(username, password);

      setUser(res.user);
      // return res;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Register handler

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    try {
      const res = await register(username, email, password);

      setUser(res.user);
      // return res;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, handleLogin, handleRegister }}
    >
      {children}
    </AuthContext.Provider>
  );
}
