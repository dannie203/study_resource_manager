"use client";
import { AuthProvider } from '@/context/authContext';
import { SidebarProvider } from '@/context/sidebarContext';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        {children}
      </SidebarProvider>
    </AuthProvider>
  );
}
