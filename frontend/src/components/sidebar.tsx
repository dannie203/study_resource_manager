'use client';

import React from 'react';
import {
  HomeIcon,
  BookOpenIcon,
  ArrowUpTrayIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { useI18n } from '../context/i18nContext';

export default function Sidebar() {
  const { t } = useI18n();
  return (
    <aside className="sidebar-bg w-64 min-h-screen flex flex-col py-8 px-4 text-green-900">
      <div className="font-extrabold text-2xl text-white mb-8 tracking-wide flex items-center gap-2">
        <BookOpenIcon className="w-7 h-7" />
        Study Manager
      </div>
      <nav className="flex flex-col gap-5 flex-1">
        <a href="/dashboard" className="flex items-center gap-3 text-white hover:bg-green-800 px-3 py-2 rounded-lg transition-colors font-medium">
          <HomeIcon className="w-5 h-5" /> {t('dashboard')}
        </a>
        <a href="/profile" className="flex items-center gap-3 text-white hover:bg-green-800 px-3 py-2 rounded-lg transition-colors font-medium">
          <Cog6ToothIcon className="w-5 h-5" /> {t('profile')}
        </a>
        <a href="/upload" className="flex items-center gap-3 text-white hover:bg-green-800 px-3 py-2 rounded-lg transition-colors font-medium">
          <ArrowUpTrayIcon className="w-5 h-5" /> {t('upload')}
        </a>
        <a href="/resources" className="flex items-center gap-3 text-white hover:bg-green-800 px-3 py-2 rounded-lg transition-colors font-medium">
          <BookOpenIcon className="w-5 h-5" /> {t('resources')}
        </a>
      </nav>
      <div className="mt-auto w-full flex justify-center">
        <div className="text-xs text-green-50 bg-green-900 bg-opacity-80 rounded-md p-2 w-[90%] flex flex-col items-start gap-1 shadow border border-green-700">
          <div className="flex items-center gap-1 font-semibold"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9.75h.008v.008H11.25V9.75zm.75 3v-1.5m0 0a.75.75 0 10-1.5 0v1.5a.75.75 0 001.5 0zm0 0v1.5m0 0a.75.75 0 01-1.5 0v-1.5a.75.75 0 011.5 0z" /><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /></svg>{t('system_info')}</div>
          <div>Study Resource Manager</div>
          <div>v1.0 &copy; 2025</div>
          <div>Hỗ trợ: <a href="mailto:mayduahayhoc@gmail.com" className="underline text-blue-200">mayduahayhoc@gmail.com</a></div>
        </div>
      </div>
    </aside>
  );
}
