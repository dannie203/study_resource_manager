import React, { useEffect, useState } from "react";
import { useI18n } from '../../context/i18nContext';

type Stats = {
  totalResources: number;
  totalUploads: number;
  totalDownloads: number;
};

export default function StatsOverview() {
  const { t } = useI18n();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/resources/stats", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setStats);
  }, []);

  if (!stats) return <div className="py-8 text-center text-green-700 font-semibold">{t('loading_stats')}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-2xl p-6 text-center shadow border border-gray-100">
        <div className="text-3xl font-bold text-green-800">{stats.totalResources}</div>
        <div className="text-gray-500 mt-2">{t('total_resources')}</div>
      </div>
      <div className="bg-white rounded-2xl p-6 text-center shadow border border-gray-100">
        <div className="text-3xl font-bold text-green-800">{stats.totalUploads}</div>
        <div className="text-gray-500 mt-2">{t('total_uploads')}</div>
      </div>
      <div className="bg-white rounded-2xl p-6 text-center shadow border border-gray-100">
        <div className="text-3xl font-bold text-green-800">{stats.totalDownloads}</div>
        <div className="text-gray-500 mt-2">{t('total_downloads')}</div>
      </div>
    </div>
  );
}
