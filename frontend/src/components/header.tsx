'use client';

import { Bars3Icon } from '@heroicons/react/24/outline';
import { useSidebar } from '@/context/sidebarContext';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';
import useBreakpoint from '@/hooks/useBreakpoint';
import React from 'react';

export default function Header() {
  const { setAuthenticated } = useAuth();
  const { setIsMobileOpen } = useSidebar();
  const { isMobile } = useBreakpoint();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
  };

  return (
    <header className="w-full h-[80px] flex items-center px-6 bg-[#1e1e1e] shadow">
      <h1 className="text-2xl font-bold">Dashboard Header</h1>
    </header>
  );
}
