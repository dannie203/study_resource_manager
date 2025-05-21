'use client';

import { Bars3Icon } from '@heroicons/react/24/outline';
import { useSidebar } from '@/context/sidebarContext';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';
import useBreakpoint from '@/hooks/useBreakpoint';
import React from 'react';
import { useI18n } from '../context/i18nContext';
import { useRouter } from 'next/navigation';

export default function Header({ title }: { title: string }) {
  const { setAuthenticated, setUserRole } = useAuth();
  const { setIsMobileOpen } = useSidebar();
  const { isMobile } = useBreakpoint();
  const { language, setLanguage, t } = useI18n();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      // Không cần xóa cookie bằng document.cookie vì cookie httpOnly chỉ backend mới xóa được
    } catch (err) {
      // Có thể log lỗi nếu cần
    } finally {
      setAuthenticated(false);
      setUserRole(null);
      router.replace('/'); // Chuyển về landing page sau khi logout
    }
  };

  return (
    <header className="w-full h-[80px] flex items-center justify-between px-8 card-bg shadow-lg rounded-b-2xl mb-4 transition-colors border-b border-[var(--clr-green-light)]">
      <div className="flex items-center gap-3">
        <img src="/favicon.ico" alt="Logo" className="w-10 h-10 rounded-full border-2 border-[var(--clr-green-light)] bg-white shadow" />
        <h1 className="text-3xl font-bold tracking-wide text-[var(--clr-green-dark)] drop-shadow-sm">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <select
          value={language}
          onChange={e => setLanguage(e.target.value as 'vi' | 'en')}
          className="px-3 py-1 rounded border border-[var(--clr-green-light)] bg-white text-[var(--clr-green-dark)] font-semibold focus:border-[var(--clr-green-dark)] shadow-sm"
          aria-label="Language selector"
        >
          <option value="vi">Tiếng Việt</option>
          <option value="en">English</option>
        </select>
        <button
          onClick={handleLogout}
          className="btn-primary px-5 py-2 shadow hover:scale-105 active:scale-95 transition-transform"
        >
          {t('logout')}
        </button>
      </div>
    </header>
  );
}
