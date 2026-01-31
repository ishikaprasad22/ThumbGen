import { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import type { ReactNode } from "react";
import type { IUser } from "../assets/assets";
import api from "../configs/api";

interface AuthContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  signUp: (payload: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
  login: async () => {},
  signUp: async () => {},
  logout: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const { data } = await api.post('/api/auth/login', credentials);
      
      setUser(data.user ?? null);
      setIsLoggedIn(true);
      toast.success('Login successful!');
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(errorMessage);
      throw error;
    }
  };

  const signUp = async (payload: { name: string; email: string; password: string }) => {
    try {
      const { data } = await api.post('/api/auth/register', payload);
      
      setUser(data.user ?? null);
      setIsLoggedIn(true);
      toast.success('Account created successfully!');
    } catch (error: any) {
      console.error('Signup error:', error);
      const errorMessage = error.response?.data?.message || 'Signup failed. Please try again.';
      toast.error(errorMessage);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/api/auth/logout');
      
      setUser(null);
      setIsLoggedIn(false);
      toast.success('Logged out successfully');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error('Logout failed. Please try again.');
      throw error;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        console.log('[AuthContext] Verifying user session...');
        const { data } = await api.get('/api/auth/verify');
        console.log('[AuthContext] Verify response:', data);
        if (data.user) {
          setUser(data.user as IUser);
          setIsLoggedIn(true);
          console.log('[AuthContext] User verified:', data.user);
        }
      } catch (err: any) {
        console.log('[AuthContext] Verify failed:', err.response?.status, err.response?.data);
      }
    })();
  }, []);

  const value: AuthContextProps = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    login,
    signUp,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);