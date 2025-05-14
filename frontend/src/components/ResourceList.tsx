'use client';

import { useEffect, useState } from 'react';
import ResourceCard from './resourceCard';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/authContext';

interface Resource {
  id: number;
  title: string;
  subject: string;
  fileUrl: string;
  originalName: string;
  createdAt: string;
  status?: string;
}

export default function ResourceList() {
  const { userRole } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const pageSize = 10;

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
        toast.error('Lỗi khi lấy tài liệu!');
        setResources([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  // Hàm xóa resource khỏi danh sách sau khi xóa thành công
  const handleDeleteResource = (id: number) => {
    setResources(resources => resources.filter(res => res.id !== id));
  };

  // Chỉ hiển thị tài nguyên đã duyệt hoặc tài nguyên của chính user (nếu là user)
  let filtered = resources;
  if (userRole === 'ADMIN') {
    if (statusFilter !== 'ALL') filtered = filtered.filter(r => r.status === statusFilter);
  } else {
    filtered = filtered.filter(r => r.status === 'APPROVED' || r.status === undefined);
  }
  const paged = filtered.slice((page-1)*pageSize, page*pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  if (loading)
    return (
      <div className="flex justify-center items-center py-10">
        <span className="text-green-700 text-lg font-semibold animate-pulse">Đang tải tài liệu...</span>
      </div>
    );
  if (!resources.length)
    return (
      <div className="flex flex-col items-center py-10 text-gray-400">
        <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><path stroke="#9ca3af" strokeWidth="2" d="M7 17V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v10M7 17h10M7 17v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2"/></svg>
        <span className="mt-2 text-base">Không có tài liệu nào.</span>
      </div>
    );

  return (
    <div>
      {userRole === 'ADMIN' && (
        <div className="mb-4 flex items-center gap-4">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border px-3 py-2 rounded-lg">
            <option value="ALL">Tất cả</option>
            <option value="PENDING">Chờ duyệt</option>
            <option value="APPROVED">Đã duyệt</option>
            <option value="REJECTED">Từ chối</option>
          </select>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm kiếm..." className="border px-3 py-2 rounded-lg w-64" />
        </div>
      )}
      {userRole !== 'ADMIN' && (
        <div className="mb-4 flex items-center gap-4">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm kiếm..." className="border px-3 py-2 rounded-lg w-64" />
        </div>
      )}
      <div className="space-y-5 px-2 max-w-2xl mx-auto">
        {paged.map((r) => (
          <ResourceCard key={r.id} resource={r} onDelete={handleDeleteResource} />
        ))}
      </div>
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setPage(i+1)} className={`px-3 py-1 rounded ${page === i+1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-green-800'}`}>{i+1}</button>
        ))}
      </div>
    </div>
  );
}
