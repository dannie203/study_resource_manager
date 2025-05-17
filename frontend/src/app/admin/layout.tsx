"use client";
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import React from 'react';
import AdminSidebar from '@/components/adminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userRole, isAuthenticated } = useAuth();
  const router = useRouter();

  const hasChecked = userRole !== null || isAuthenticated;

  useEffect(() => {
    if (!hasChecked) return;
    if (isAuthenticated && userRole !== 'ADMIN') {
      router.replace('/dashboard');
    }
    if (!isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [userRole, isAuthenticated, router, hasChecked]);

  if (!hasChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || userRole !== 'ADMIN') {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Chỉ render sidebar admin, không render sidebar user */}
      <AdminSidebar />
      <div className="flex flex-col flex-1">
        <Header title="Admin Panel" />
        <main className="p-6 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
