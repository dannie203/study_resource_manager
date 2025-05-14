'use client';

import React from 'react';
import {
  HomeIcon,
  BookOpenIcon,
  ArrowUpTrayIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  return (
    <aside className="w-56 min-h-screen bg-gradient-to-b from-green-700 to-green-500 flex flex-col p-6 rounded-r-3xl shadow-lg">
      <div className="font-extrabold text-2xl text-white mb-8 tracking-wide flex items-center gap-2">
        <BookOpenIcon className="w-7 h-7" />
        Study Manager
      </div>
      <nav className="flex flex-col gap-5">
        <a href="/dashboard" className="flex items-center gap-3 text-white hover:bg-green-800 px-3 py-2 rounded-lg transition-colors font-medium">
          <HomeIcon className="w-5 h-5" /> Dashboard
        </a>
        <a href="/profile" className="flex items-center gap-3 text-white hover:bg-green-800 px-3 py-2 rounded-lg transition-colors font-medium">
          <Cog6ToothIcon className="w-5 h-5" /> Profile
        </a>
        <a href="/upload" className="flex items-center gap-3 text-white hover:bg-green-800 px-3 py-2 rounded-lg transition-colors font-medium">
          <ArrowUpTrayIcon className="w-5 h-5" /> Upload
        </a>
        <a href="/resources" className="flex items-center gap-3 text-white hover:bg-green-800 px-3 py-2 rounded-lg transition-colors font-medium">
          <BookOpenIcon className="w-5 h-5" /> Resources
        </a>
      </nav>
    </aside>
  );
}
