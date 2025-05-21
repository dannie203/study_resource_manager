'use client';

import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import StatsOverview from '@/components/dashboard/StatsOverview';
import ResourceCategoryChart from '@/components/dashboard/ResourceCategoryChart';
import DownloadChart from '@/components/dashboard/DownloadChart';
import TopDownloads from '@/components/dashboard/TopDownloads';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [isAuthenticated, router]);
  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen main-bg text-[var(--clr-green-dark)] font-sans">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header title={"Dashboard"} />
        <main className="p-6 max-w-6xl mx-auto w-full main-bg">
          <StatsOverview />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <ResourceCategoryChart />
            <DownloadChart />
          </div>
          <div className="mt-6">
            <TopDownloads />
          </div>
          <div className="mt-8 flex justify-center">
            <iframe
              src="https://discord.com/widget?id=1285456111045972079&theme=dark"
              width="350"
              height="500"
              frameBorder="0"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              style={{ borderRadius: 12 }}
              title="Discord Widget"
            />
          </div>
        </main>
      </div>
    </div>
  );
}
