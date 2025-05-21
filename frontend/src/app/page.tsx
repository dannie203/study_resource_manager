'use client';

import { useI18n } from "@/context/i18nContext";
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { useEffect } from "react";
import { useAuth } from "@/context/authContext";

export default function LandingPage() {
  const { t, language, setLanguage } = useI18n();
  const { isAuthenticated, userRole } = useAuth();
  const router = typeof window !== 'undefined' ? require('next/navigation').useRouter() : null;

  useEffect(() => {
    // Chỉ redirect khi đang ở đúng trang landing ("/") và đã đăng nhập
    // Không ép admin sang /admin nếu họ muốn vào /dashboard
    if (isAuthenticated && router && window.location.pathname === '/') {
      if (userRole === 'ADMIN') router.push('/admin');
      else router.push('/dashboard');
    }
  }, [isAuthenticated, userRole, router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-neutral-950 px-4 relative">
      {/* Language selector icon */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <button
          aria-label="Change language"
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-800 transition"
          onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
        >
          <GlobeAltIcon className="w-6 h-6 text-green-700" />
        </button>
        <span className="text-xs font-semibold text-green-700 select-none">{language === 'vi' ? 'VI' : 'EN'}</span>
      </div>
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        {t('landing_welcome')}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl">
        {t('landing_desc')}
      </p>
      <div className="flex flex-col items-center space-y-2">
        <div className="flex space-x-4">
          <a
            href="/auth/login"
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            {t('login')}
          </a>
          <a
            href="/auth/register"
            className="px-6 py-3 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition"
          >
            {t('register')}
          </a>
        </div>
        <a
          href="/auth/forgot-password"
          className="text-sm text-green-500 hover:underline"
        >
          {t('forgot_password')}
        </a>
      </div>
    </main>
  );
}
