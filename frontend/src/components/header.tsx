'use client';

import { Bars3Icon } from '@heroicons/react/24/outline';
import { useSidebar } from '@/context/sidebarContext';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';
import useBreakpoint from '@/hooks/useBreakpoint';
import React from 'react';

export default function Header({ title }: { title: string }) {
  const { setAuthenticated } = useAuth();
  const { setIsMobileOpen } = useSidebar();
  const { isMobile } = useBreakpoint();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
    window.location.href = '/auth/login';
  };

  return (
    <header className="w-full h-[80px] flex items-center justify-between px-8 bg-white shadow-lg rounded-b-2xl mb-4 transition-colors border-b border-gray-200">
      <div className="flex items-center gap-3">
        <img src="/favicon.ico" alt="Logo" className="w-8 h-8" />
        <h1 className="text-3xl font-bold tracking-wide text-green-700 drop-shadow">{title}</h1>
      </div>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors font-semibold"
      >
        Đăng xuất
      </button>
    </header>
  );
}
