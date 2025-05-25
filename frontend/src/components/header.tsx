'use client';
import { ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '@/context/authContext';
import React from 'react';
import { useI18n } from '../context/i18nContext';
import { useRouter } from 'next/navigation';


const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function Header({ title }: { title: string }) {
  const { setAuthenticated, setUserRole } = useAuth();
  const { language, setLanguage, t } = useI18n();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
    } finally {
      setAuthenticated(false);
      setUserRole(null);
      router.replace('/');
    }
  };


  return (
    <header className="w-full h-[80px] flex items-center justify-between px-4 sm:px-6 md:px-8 bg-gradient-to-r from-[#386641] to-[#2A4B30] shadow-[0_4px_20px_rgba(56,102,65,0.5)] mb-4 transition-all duration-300">
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        <div className="w-10 sm:w-0" />
        <img
          src="/favicon.ico"
          alt="Logo"
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transform hover:scale-110 transition-transform duration-300 animate-pulse shadow-[0_0_15px_rgba(167,201,87,0.8)]"
        />
        <h1
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold tracking-wider text-[#A7C957] drop-shadow-[0_0_8px_rgba(167,201,87,0.6)] truncate"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        <div className="relative">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'vi' | 'en')}
            className="
            px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 pr-8 sm:pr-10
            bg-transparent border-2 border-[#A7C957]/50 text-[#A7C957] 
            font-medium sm:font-semibold text-sm sm:text-base
            hover:border-[#A7C957] hover:shadow-[0_0_10px_rgba(167,201,87,0.6)] 
            focus:ring-0 focus:outline-none
            transition-all duration-300 appearance-none rounded
            min-w-[80px] sm:min-w-[100px]
          "
            aria-label="Language selector"
          >
                <option value="vi" className="bg-[#2A4B30] text-[#A7C957]">VIE</option>
                <option value="en" className="bg-[#2A4B30] text-[#A7C957]">English</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#A7C957] pointer-events-none" />
        </div>
        <button
          onClick={handleLogout}
          className="
          px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 
          bg-transparent border-2 border-red-400/50 text-red-400 
          font-medium sm:font-semibold text-sm sm:text-base
          hover:bg-red-500/20 hover:border-red-400 
          hover:shadow-[0_0_10px_rgba(239,68,68,0.6)]
          focus:outline-none focus:ring-2 focus:ring-red-400/50
          transition-all duration-300 rounded
          whitespace-nowrap flex items-center gap-1 sm:gap-2
        "
          aria-label="Logout"
        >
          <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">{t('logout')}</span>
        </button>
      </div>
    </header>
  );
}