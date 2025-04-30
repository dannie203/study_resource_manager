import { ReactNode } from 'react';
import Header from '@/components/header'; // Global header component
import Sidebar from '@/components/sidebar'; // Optional sidebar component

/**
 * ProfileLayout
 * This layout wraps the profile page and provides a consistent structure.
 */
export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-neutral-950">
      {/* Optional Sidebar */}
      <Sidebar />
      <main className="flex-1">
        {/* Header */}
        <Header />
        {/* Main Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}