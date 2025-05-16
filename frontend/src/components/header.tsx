'use client';

import { Bars3Icon } from '@heroicons/react/24/outline';
import { useSidebar } from '@/context/sidebarContext';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';
import useBreakpoint from '@/hooks/useBreakpoint';
import React from 'react';
import { useI18n } from '../context/i18nContext';

export default function Header({ title }: { title: string }) {
  const { setAuthenticated } = useAuth();
  const { setIsMobileOpen } = useSidebar();
  const { isMobile } = useBreakpoint();
  const { language, setLanguage, t } = useI18n();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
    window.location.href = '/auth/login';
  };

  return (
    <header className="w-full h-[80px] flex items-center justify-between px-8 card-bg shadow-lg rounded-b-2xl mb-4 transition-colors border-b border-gray-200">
      <div className="flex items-center gap-3">
        <img src="/favicon.ico" alt="Logo" className="w-8 h-8" />
        <h1 className="text-3xl font-bold tracking-wide text-green-700 drop-shadow">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <select
          value={language}
          onChange={e => setLanguage(e.target.value as 'vi' | 'en')}
          className="px-2 py-1 rounded border border-gray-300 bg-white text-green-700 font-semibold"
          aria-label="Language selector"
        >
          <option value="vi">Tiếng Việt</option>
          <option value="en">English</option>
        </select>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors font-semibold"
        >
          {t('logout')}
        </button>
      </div>
    </header>
  );
}
