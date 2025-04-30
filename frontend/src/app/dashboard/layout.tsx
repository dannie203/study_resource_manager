import { ReactNode } from 'react';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-neutral-950">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
