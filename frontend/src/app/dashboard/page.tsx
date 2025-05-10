'use client';

import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import StatsSummary from '@/components/statsSummary';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#121212] text-white font-sans">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header title={"Dashboard"} />
        <main className="p-4">
          <StatsSummary />
          {/* Add more dashboard content here */}
        </main>
      </div>
    </div>
  );
}
