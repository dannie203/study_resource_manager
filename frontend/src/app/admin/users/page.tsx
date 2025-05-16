"use client";
import { Fragment, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import ConfirmModal from '@/components/ConfirmModal';
import { useEffect } from 'react';
import UserTable from '@/components/UserTable';

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
    if (!token) {
      toast.error('Bạn chưa đăng nhập.');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        toast.error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
        localStorage.removeItem('token');
        setTimeout(() => window.location.href = '/auth/login', 1500);
        setUsers([]);
        setLoading(false);
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error ?? 'Lỗi máy chủ khi lấy danh sách user!');
        setUsers([]);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      toast.error('Lỗi kết nối đến server. Vui lòng thử lại sau!');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handlePromote = async (id: string) => {
    toast.loading('Đang cấp quyền...');
    const token = localStorage.getItem('token');
    if (!token) {
      toast.dismiss();
      toast.error('Bạn chưa đăng nhập.');
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}/role`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'ADMIN' }),
      });
      toast.dismiss();
      if (res.status === 401) {
        toast.error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
        localStorage.removeItem('token');
        setTimeout(() => window.location.href = '/auth/login', 1500);
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error ?? 'Có lỗi khi cấp quyền!');
        return;
      }
      toast.success('Đã cấp quyền Admin!');
      fetchUsers();
    } catch {
      toast.dismiss();
      toast.error('Lỗi kết nối đến server.');
    }
  };

  const handleDelete = async (id: string) => {
    toast.loading('Đang xoá...');
    const token = localStorage.getItem('token');
    if (!token) {
      toast.dismiss();
      toast.error('Bạn chưa đăng nhập.');
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.dismiss();
      if (res.status === 401) {
        toast.error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
        localStorage.removeItem('token');
        setTimeout(() => window.location.href = '/auth/login', 1500);
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error ?? 'Có lỗi khi xoá!');
        return;
      }
      toast.success('Đã xoá thành công!');
      fetchUsers();
    } catch {
      toast.dismiss();
      toast.error('Lỗi kết nối đến server.');
    }
  };

  const filtered = users.filter(u => u.username.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
  const paged = filtered.slice((page-1)*pageSize, page*pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <div className="flex min-h-screen sidebar-bg text-gray-900 font-sans">
      <div className="flex flex-col flex-1">
        <main className="p-6 max-w-6xl mx-auto w-full main-bg">
          <h1 className="text-2xl font-bold mb-6 text-green-800">Danh sách người dùng</h1>
          <UserTable
            users={users}
            loading={loading}
            page={page}
            pageSize={pageSize}
            totalPages={totalPages}
            search={search}
            setSearch={setSearch}
            setPage={setPage}
            onPromote={handlePromote}
            onDelete={handleDelete}
            setConfirm={setConfirm}
          />
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
