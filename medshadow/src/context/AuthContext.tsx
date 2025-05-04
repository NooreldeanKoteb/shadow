import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'facility';
  profileImage: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: 'student' | 'facility') => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook for localStorage access
const useLocalStorage = (key: string, initialValue: string | null) => {
  const [storedValue, setStoredValue] = useState<string | null>(initialValue);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const item = window.localStorage.getItem(key);
      setStoredValue(item ? item : initialValue);
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      setStoredValue(initialValue);
    }
  }, [key, initialValue]);

  const setValue = (value: string | null) => {
    try {
      if (typeof window === 'undefined') {
        return;
      }

      if (value === null) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, value);
      }
      setStoredValue(value);
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  };

  return [storedValue, setValue] as const;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useLocalStorage('token', null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Check if user is already logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      if (typeof window === 'undefined') {
        setIsLoading(false);
        return;
      }

      if (token) {
        try {
          // Fetch user data
          const response = await fetch('/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            setToken(null);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [token, setToken]);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Store token and user data
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.token);
      }
      setToken(data.token);
      setUser(data.user);
      
      // Redirect based on role
      if (data.user.role === 'student') {
        router.push('/student/dashboard');
      } else {
        router.push('/facility/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: 'student' | 'facility') => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      // Store token and user data
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.token);
      }
      setToken(data.token);
      setUser(data.user);
      
      // Redirect based on role
      if (data.user.role === 'student') {
        router.push('/student/dashboard');
      } else {
        router.push('/facility/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
      setToken(null);
      setUser(null);
      
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during logout');
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    token,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 