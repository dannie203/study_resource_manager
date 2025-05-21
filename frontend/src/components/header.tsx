'use client';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useSidebar } from '@/context/sidebarContext';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';
import useBreakpoint from '@/hooks/useBreakpoint';
import React from 'react';
import { useI18n } from '../context/i18nContext';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function Header({ title }: { title: string }) {
  const { setAuthenticated, setUserRole } = useAuth();
  const { setIsMobileOpen } = useSidebar();
  const { isMobile } = useBreakpoint();
  const { language, setLanguage, t } = useI18n();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
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
    <header className="w-full h-[80px] flex items-center justify-between px-8 bg-gradient-to-r from-[#386641] to-[#2A4B30] shadow-[0_4px_20px_rgba(56,102,65,0.5)] mb-4 transition-all duration-300">
      <div className="flex items-center gap-4">
        <img
          src="/favicon.ico"
          alt="Logo"
          className="w-12 h-12 transform hover:scale-110 transition-transform duration-300 animate-pulse shadow-[0_0_15px_rgba(167,201,87,0.8)]"
        />
        <h1
          className="text-3xl font-extrabold tracking-wider text-[#A7C957] drop-shadow-[0_0_8px_rgba(167,201,87,0.6)]"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'vi' | 'en')}
          className="
            px-4 py-2 bg-transparent border-2 border-[#A7C957]/50 text-[#A7C957] font-semibold
            hover:border-[#A7C957] hover:shadow-[0_0_10px_rgba(167,201,87,0.6)] focus:ring-0
            transition-all duration-300 appearance-none
          "
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23A7C957' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.75rem center',
            backgroundSize: '1.2em 1.2em',
          }}
          aria-label="Language selector"
        >
          <option value="vi" className="bg-[#2A4B30] text-[#A7C957]">
            Tiếng Việt
          </option>
          <option value="en" className="bg-[#2A4B30] text-[#A7C957]">
            English
          </option>
        </select>
        <button
          onClick={handleLogout}
          className="
            px-4 py-2 bg-transparent border-2 border-[#A7C957]/50 text-[#A7C957] font-semibold
            hover:bg-[#A7C957]/20 hover:border-[#A7C957] hover:shadow-[0_0_10px_rgba(167,201,87,0.6)]
            transition-all duration-300
          "
        >
          {t('logout')}
        </button>
      </div>
    </header>
  );
}