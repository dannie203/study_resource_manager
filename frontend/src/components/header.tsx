'use client';

import { useSidebar } from '@/context/sidebarContext';

export default function Header() {
  const { isCollapsed } = useSidebar();

  return (
    <header
      className={`fixed top-0 right-0 h-16 bg-white dark:bg-neutral-900 shadow-md flex items-center px-6 transition-all duration-300 z-30 ${
        isCollapsed ? 'ml-20 w-[calc(100%-5rem)]' : 'ml-64 w-[calc(100%-16rem)]'
      }`}
    >
      <h1 className="text-xl font-bold text-neutral-800 dark:text-white">
        Resource Manager
      </h1>
    </header>
  );
}
