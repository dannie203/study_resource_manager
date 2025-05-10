'use client';

import { useEffect, useState } from 'react';
import ResourceCard from './resourceCard';

interface Resource {
  id: number;
  title: string;
  subject: string;
  fileUrl: string;
  originalName: string;
  createdAt: string;
}

export default function ResourceList() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      const token = localStorage.getItem('token');
      if (!token) return setLoading(false);

      try {
        const res = await fetch('http://localhost:5000/api/resources', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Lỗi khi lấy tài liệu');
        const data = await res.json();
        setResources(data);
      } catch {
        setResources([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  if (loading) return <p>Đang tải tài liệu...</p>;
  if (!resources.length) return <p>Không có tài liệu nào.</p>;

  return (
    <div className="space-y-3">
      {resources.map((r) => (
        <ResourceCard key={r.id} resource={r} />
      ))}
    </div>
  );
}
