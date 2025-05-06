'use client';

import { useSidebar } from '@/context/sidebarContext';

export default function Header() {
  const { isCollapsed } = useSidebar();

  return (
    <header
      className={`relative w-full h-16 bg-white dark:bg-neutral-900 shadow-md flex items-center px-6 transition-all duration-300 z-30`}
    >
      <h1 className={`text-xl font-bold text-neutral-800 dark:text-white ${
        isCollapsed ? 'lg:pl-20 xl:pl-20' : 'lg:pl-64 xl:pl-64'
      }`}>
        Resource Manager
      </h1>
    </header>
  );
}
