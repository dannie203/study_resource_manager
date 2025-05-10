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
    <aside className="w-48 min-h-screen bg-[#2f5d3a] flex flex-col p-4">
      <div className="font-bold text-lg mb-6">Sidebar</div>
      <nav className="flex flex-col gap-4">
        <a href="/dashboard" className="hover:underline">Dashboard</a>
        <a href="/profile" className="hover:underline">Profile</a>
        <a href="/upload" className="hover:underline">Upload</a>
      </nav>
    </aside>
  );
}
