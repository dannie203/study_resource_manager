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
  const pathname = usePathname();

  // Lấy role từ cookie bằng cách gọi API /api/users/me (nếu đã đăng nhập)
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users/me', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUserRole(data.role ?? null);
          setIsAuthenticated(true);
        } else {
          console.error('>> Failed to fetch user role');
          console.error('>> Response status:', res.status);
          console.error('>> Response status text:', res.statusText);
          setUserRole(null);
          setIsAuthenticated(false);
        }
      } catch {
        setUserRole(null);
        setIsAuthenticated(false);
      }
    };
    fetchRole();
  }, [pathname, children]);

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
