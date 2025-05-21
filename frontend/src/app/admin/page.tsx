"use client";
import React, { useEffect, useState } from 'react';
import { useI18n } from "@/context/i18nContext";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [pending, setPending] = useState<number>(0);
  const { t } = useI18n();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const resUser = await fetch('http://localhost:5000/api/users/stats', { credentials: 'include' });
        const userStats = await resUser.json();
        const resResource = await fetch('http://localhost:5000/api/resources', { credentials: 'include' });
        const resources = await resResource.json();
        setStats({
          totalUsers: userStats.totalUsers,
          totalResources: resources.length,
        });
        setPending(resources.filter((r: any) => r.status === 'PENDING').length);
      } catch {}
    };
    fetchStats();
  }, []);

  return (
    <main className="p-6 max-w-6xl mx-auto w-full main-bg">
      <h1 className="text-3xl font-bold mb-6 text-green-800">{t('admin_welcome')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white card-bg rounded-2xl shadow p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-2 text-green-700">{t('admin_stats_title')}</h2>
          <ul className="text-gray-700 space-y-2">
            <li>{t('admin_total_users')}: {stats ? stats.totalUsers : '...'}</li>
            <li>{t('admin_total_resources')}: {stats ? stats.totalResources : '...'}</li>
            <li>{t('admin_pending_resources')}: {pending ?? '...'}</li>
          </ul>
        </div>
        <div className="bg-white card-bg rounded-2xl shadow p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-2 text-green-700">{t('admin_recent_activity')}</h2>
          <ul className="text-gray-700 space-y-2">
            <li>...</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
