import { createContext, useContext, useState, useEffect } from "react";
import api from "../api";

interface AuthContextType {
  user: { username: string } | null;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      console.log("Logging in with:", { username, password });
  
      const response = await api.post("/auth/login", { username, password });
      console.log("Login response:", response.data);
  
      const token = response.data.access_token;
      const loggedInUsername = response.data.username; // Get username from response
  
      if (!token || !loggedInUsername) {
        console.error("No token or username received from backend!");
        return false;
      }
  
      // Store both token and username
      localStorage.setItem("token", token);
      localStorage.setItem("username", loggedInUsername);
  
      setToken(token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("Token set in headers:", api.defaults.headers.common["Authorization"]);
  
      await fetchProfile();
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };
  
  
  

  const register = async (username: string, password: string): Promise<boolean> => {
    try {
      await api.post("/auth/register", { username, password });
      return true; // Auto-login after successful registration
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  };
  // Fetch user profile
  const fetchProfile = async () => {
    try {
      const response = await api.get("/auth/profile");
      setUser(response.data);
    } catch (error: any) {
      console.error("Error fetching profile", error);
  
      // If the error is 401, log the user out
      if (error.response && error.response.status === 401) {
        console.warn("Unauthorized! Logging out...");
        logout();
      }
    }
  };
  

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("Stored token in localStorage:", storedToken);
    
    if (storedToken) {
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      console.log("Token set in headers on app start:", api.defaults.headers.common["Authorization"]);
      
      fetchProfile();
    }
  }, []);
  
  
  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
