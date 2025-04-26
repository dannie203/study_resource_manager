'use client';

import { Home, BookOpen, Download, User } from 'lucide-react';
import Link from 'next/link';

const Sidebar = () => {
  const navItems = [
    { icon: <Home size={24} />, href: '/', label: 'Home' },
    { icon: <BookOpen size={24} />, href: '/resources', label: 'Resources' },
    { icon: <Download size={24} />, href: '/downloads', label: 'Downloads' },
    { icon: <User size={24} />, href: '/profile', label: 'Profile' },
  ];

  return (
    <div className="flex flex-col items-center bg-gray-50 w-16 h-screen py-6 gap-6 border-r">
      {navItems.map((item, index) => (
        <Link href={item.href} key={item.label} className="text-gray-500 hover:text-blue-500">
          {item.icon}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
