"use client";
import { Fragment, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { ConfirmModal } from '@/components/clientComponents';
import { useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState<{ open: boolean; id: string | null; action: 'promote' | 'delete' | null }>({ open: false, id: null, action: null });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const fetchUsers = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/users', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handlePromote = async (id: string) => {
    toast.loading('Đang cấp quyền...');
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/users/${id}/role`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'ADMIN' }),
    });
    toast.dismiss();
    if (res.ok) {
      toast.success('Đã cấp quyền Admin!');
      fetchUsers();
    } else {
      toast.error('Có lỗi khi cấp quyền!');
    }
  };

  const handleDelete = async (id: string) => {
    toast.loading('Đang xoá...');
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/users/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.dismiss();
    if (res.ok) {
      toast.success('Đã xoá thành công!');
      fetchUsers();
    } else {
      toast.error('Có lỗi khi xoá!');
    }
  };

  // Tìm kiếm và phân trang
  const filtered = users.filter(u => u.username.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
  const paged = filtered.slice((page-1)*pageSize, page*pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      <div className="flex flex-col flex-1">
        <main className="p-6 max-w-6xl mx-auto w-full">
          <h1 className="text-2xl font-bold mb-6 text-green-800">Danh sách người dùng</h1>
          <div className="mb-4 flex items-center gap-4">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm kiếm..." className="border px-3 py-2 rounded-lg w-64" />
          </div>
          {loading ? (
            <div className="py-10 text-center text-green-700 font-semibold animate-pulse">Đang tải...</div>
          ) : (
            <table className="w-full bg-white rounded-2xl shadow border border-gray-100">
              <thead>
                <tr className="bg-green-50 text-green-800">
                  <th className="p-3 text-left">Username</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-left">Ngày tạo</th>
                  <th className="p-3 text-left">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {paged.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-8 text-gray-400">Không có dữ liệu</td></tr>
                ) : paged.map((u) => (
                  <tr key={u.id} className="border-t">
                    <td className="p-3">{u.username}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3 uppercase font-semibold text-green-700">{u.role}</td>
                    <td className="p-3">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="p-3 flex gap-2">
                      {u.role !== 'ADMIN' && (
                        <button onClick={() => setConfirm({ open: true, id: u.id, action: 'promote' })} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Cấp quyền Admin</button>
                      )}
                      <button onClick={() => setConfirm({ open: true, id: u.id, action: 'delete' })} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Xoá</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {/* Phân trang */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setPage(i+1)} className={`px-3 py-1 rounded ${page === i+1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-green-800'}`}>{i+1}</button>
            ))}
          </div>
          <ConfirmModal
            open={confirm.open}
            onClose={() => setConfirm({ open: false, id: null, action: null })}
            onConfirm={() => {
              if (confirm.id && confirm.action === 'promote') handlePromote(confirm.id);
              if (confirm.id && confirm.action === 'delete') handleDelete(confirm.id);
            }}
            title={confirm.action === 'promote' ? 'Cấp quyền Admin' : 'Xoá user'}
            description={confirm.action === 'promote' ? 'Bạn có chắc muốn cấp quyền Admin cho user này?' : 'Bạn có chắc muốn xoá user này?'}
          />
        </main>
      </div>
    </div>
  );
}
