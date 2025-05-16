"use client";
import React, { useEffect, useState } from 'react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [pending, setPending] = useState<number>(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const resUser = await fetch('http://localhost:5000/api/users/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userStats = await resUser.json();
        const resResource = await fetch('http://localhost:5000/api/resources', {
          headers: { Authorization: `Bearer ${token}` },
        });
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
      <h1 className="text-3xl font-bold mb-6 text-green-800">Chào mừng đến trang quản trị</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white card-bg rounded-2xl shadow p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-2 text-green-700">Thống kê hệ thống</h2>
          <ul className="text-gray-700 space-y-2">
            <li>Tổng số người dùng: {stats ? stats.totalUsers : '...'}</li>
            <li>Tổng số tài nguyên: {stats ? stats.totalResources : '...'}</li>
            <li>Tài nguyên chờ duyệt: {pending ?? '...'}</li>
          </ul>
        </div>
        <div className="bg-white card-bg rounded-2xl shadow p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-2 text-green-700">Hoạt động gần đây</h2>
          <ul className="text-gray-700 space-y-2">
            <li>...</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
