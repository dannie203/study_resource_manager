'use client';

import {
  HomeIcon,
  UserIcon,
  CloudArrowUpIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useSidebar } from '@/context/sidebarContext';
import { useEffect, useState } from 'react';

export default function Sidebar() {
  const { isCollapsed, toggle, isMobileOpen, setIsMobileOpen } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Gọi 1 lần khi mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const links = [
    { href: '/dashboard', icon: HomeIcon, label: 'Dashboard' },
    { href: '/profile', icon: UserIcon, label: 'Profile' },
    { href: '/upload', icon: CloudArrowUpIcon, label: 'Upload' },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden p-2 m-2 text-blue-600 z-50 relative"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Overlay backdrop when mobile sidebar open */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          role="button"
          tabIndex={0}
          onClick={() => setIsMobileOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsMobileOpen(false);
            }
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen bg-white dark:bg-neutral-900 shadow-md transition-all duration-300
          ${isCollapsed ? 'w-20' : 'w-64'} 
          ${isMobileOpen ? 'block' : 'hidden'} 
          md:block
        `}
      >
        {/* Collapse / Close button */}
        <div className="flex justify-end p-2">
          <button
            onClick={() => {
              if (isMobile) {
                setIsMobileOpen(false);
              } else {
                toggle();
              }
            }}
            className="text-blue-600"
          >
            {isCollapsed || isMobile ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col space-y-3 px-4 pt-4">
          {links.map(({ href, icon: Icon, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => isMobile && setIsMobileOpen(false)}
              className="group flex items-center text-blue-600 hover:underline relative"
            >
              <Icon className="h-5 w-5 mr-2" />
              {!isCollapsed && <span>{label}</span>}
              {isCollapsed && (
                <span className="absolute left-12 bg-gray-700 text-white px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                  {label}
                </span>
              )}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
