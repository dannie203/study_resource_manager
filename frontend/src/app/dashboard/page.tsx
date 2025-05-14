'use client';

import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import StatsOverview from '@/components/dashboard/StatsOverview';
import ResourceCategoryChart from '@/components/dashboard/ResourceCategoryChart';
import DownloadChart from '@/components/dashboard/DownloadChart';
import TopDownloads from '@/components/dashboard/TopDownloads';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header title={"Dashboard"} />
        <main className="p-6 max-w-6xl mx-auto w-full">
          <StatsOverview />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <ResourceCategoryChart />
            <DownloadChart />
          </div>
          <div className="mt-6">
            <TopDownloads />
          </div>
        </main>
      </div>
    </div>
  );
}
