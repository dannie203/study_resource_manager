'use client';

import { useAuth } from '@/context/authContext';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <>{children}</>;

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4 bg-gray-50 dark:bg-neutral-950">{children}</main>
      </div>
    </div>
  );
}
