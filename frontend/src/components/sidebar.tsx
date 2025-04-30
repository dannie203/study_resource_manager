// src/components/sidebar.tsx
'use client';

import {
  HomeIcon,
  UserIcon,
  CloudArrowUpIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-neutral-900 p-4 shadow-md min-h-screen">
      <nav className="flex flex-col space-y-3">
        <a href="/dashboard" className="flex items-center text-blue-600 hover:underline">
          <HomeIcon className="h-5 w-5 mr-2" />
          Dashboard
        </a>
        <a href="/profile" className="flex items-center text-blue-600 hover:underline">
          <UserIcon className="h-5 w-5 mr-2" />
          Profile
        </a>
        <a href="/upload" className="flex items-center text-blue-600 hover:underline">
          <CloudArrowUpIcon className="h-5 w-5 mr-2" />
          Upload
        </a>
      </nav>
    </aside>
  );
}
