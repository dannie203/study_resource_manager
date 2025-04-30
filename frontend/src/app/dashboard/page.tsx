'use client';

import { useEffect, useState } from 'react';
import ResourceCard from './components/resourceCard';

interface ResourceItem {
  id: string;
  title: string;
  subject: string;
  fileUrl: string;
  createdBy: string;
}

export default function DashboardPage() {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Bạn chưa đăng nhập.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/resources', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Không thể lấy dữ liệu tài nguyên.');
        }

        const data = await res.json();
        setResources(data);
      } catch (err: any) {
        setError(err.message ?? 'Đã có lỗi xảy ra.');
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Đang tải tài nguyên...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  }

  if (resources.length === 0) {
    return <div className="text-center mt-8">Không có tài nguyên nào để hiển thị.</div>;
  }

  return <ResourceCard resources={resources} />;
}
