'use client';

import { useEffect, useState } from 'react';
import ResourceCard from './resourceCard';
import { toast } from 'react-hot-toast';
import ResourceSearchBar from './ResourceSearchBar';
import ResourcePagination from './ResourcePagination';
import { useI18n } from '../context/i18nContext';

interface Resource {
  id: number;
  title: string;
  subject: string;
  fileUrl: string;
  originalName: string;
  createdAt: string;
  status?: string; // Thêm trường status để nhận đúng dữ liệu từ backend
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ResourceList() {
  const { t } = useI18n();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch(`${API_URL}/api/resources`, { credentials: 'include' });
        if (res.status === 401) {
          toast.error('Phiên đăng nhập hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.');
          setTimeout(() => window.location.href = '/auth/login', 1500);
          setResources([]);
          return;
        }
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          toast.error(data.error ?? 'Lỗi máy chủ khi lấy tài liệu!');
          setResources([]);
          return;
        }
        const data = await res.json();
        setResources(data);
      } catch (err) {
        toast.error('Lỗi kết nối máy chủ!');
        setResources([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, [t]);

  const filtered = resources.filter(r => r.title.toLowerCase().includes(search.toLowerCase()) || r.subject.toLowerCase().includes(search.toLowerCase()) || r.originalName.toLowerCase().includes(search.toLowerCase()));
  const paged = filtered.slice((page-1)*pageSize, page*pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  if (loading)
    return (
      <div className="flex justify-center items-center py-10">
        <span className="text-green-700 text-lg font-semibold animate-pulse">{t('loading') ?? 'Đang tải tài liệu...'}</span>
      </div>
    );
  if (!resources.length)
    return (
      <div className="flex flex-col items-center py-10 text-gray-400">
        <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><path stroke="#9ca3af" strokeWidth="2" d="M7 17V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v10M7 17h10M7 17v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2"/></svg>
        <span className="mt-2 text-base">{t('no_resource') ?? 'Không có tài liệu nào.'}</span>
      </div>
    );

  return (
    <div>
      <ResourceSearchBar value={search} onChange={setSearch} />
      <div className="space-y-5 px-2 max-w-2xl mx-auto">
        {paged.map((r) => (
          <ResourceCard key={r.id} resource={r} />
        ))}
      </div>
      <ResourcePagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
