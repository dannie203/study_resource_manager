'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
  userRole: string | null;
  setUserRole: (role: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // Lấy role từ cookie bằng cách gọi API /api/users/me (nếu đã đăng nhập)
  useEffect(() => {
    const fetchRole = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/users/me`, { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUserRole(data.role ?? null);
          setIsAuthenticated(true);
        } else {
          setUserRole(null);
          setIsAuthenticated(false);
        }
      } catch {
        setUserRole(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    fetchRole();
  }, [pathname]);

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated: setIsAuthenticated, userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
