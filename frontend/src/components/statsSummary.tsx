import React, { useEffect, useState } from 'react';
import {
  DocumentTextIcon,
  UsersIcon,
  CloudArrowDownIcon,
} from '@heroicons/react/24/outline';

export default function StatsSummary() {
  const [stats, setStats] = useState<any>(null);
  const [userStats, setUserStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/resources/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setStats(data);
      } catch {}
    };
    const fetchUserStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/users/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUserStats(data);
      } catch {}
    };
    fetchStats();
    fetchUserStats();
  }, []);

  return (
    <section className="bg-white rounded-2xl p-8 shadow-lg mb-8 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-green-800 flex items-center gap-2">
        <DocumentTextIcon className="w-7 h-7 text-green-600" /> Thống kê tổng quan
      </h2>
      <div className="flex gap-8 justify-between">
        <div className="flex flex-col items-center flex-1 bg-green-50 rounded-xl p-5 shadow-sm">
          <CloudArrowDownIcon className="w-8 h-8 text-green-500 mb-2" />
          <div className="text-3xl font-bold text-green-700">{stats ? stats.totalResources : '-'}</div>
          <div className="text-gray-600 mt-1">Tài liệu đã duyệt</div>
        </div>
        <div className="flex flex-col items-center flex-1 bg-green-50 rounded-xl p-5 shadow-sm">
          <UsersIcon className="w-8 h-8 text-green-500 mb-2" />
          <div className="text-3xl font-bold text-green-700">{userStats ? userStats.totalUsers : '-'}</div>
          <div className="text-gray-600 mt-1">Người dùng</div>
        </div>
        <div className="flex flex-col items-center flex-1 bg-green-50 rounded-xl p-5 shadow-sm">
          <DocumentTextIcon className="w-8 h-8 text-green-500 mb-2" />
          <div className="text-3xl font-bold text-green-700">{stats ? stats.totalDownloads : '-'}</div>
          <div className="text-gray-600 mt-1">Tải xuống</div>
        </div>
      </div>
    </section>
  );
}