"use client";
import { Fragment, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import ConfirmModal from '@/components/ConfirmModal';
import { useEffect } from 'react';
import UserTable from '@/components/UserTable';
import { useI18n } from "@/context/i18nContext";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState<{ open: boolean; id: string | null; action: 'promote' | 'delete' | null }>({ open: false, id: null, action: null });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { t } = useI18n();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/users`, { credentials: 'include' });
      if (res.status === 401) {
        toast.error(t('session_expired'));
        setTimeout(() => window.location.href = '/auth/login', 1500);
        setUsers([]);
        setLoading(false);
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error ?? t('fetch_user_error'));
        setUsers([]);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      toast.error(t('fetch_user_error'));
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handlePromote = async (id: string) => {
    toast.loading(t('promote_admin'));
    try {
      const res = await fetch(`${API_URL}/api/users/${id}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ role: 'ADMIN' }),
      });
      toast.dismiss();
      if (res.status === 401) {
        toast.error(t('session_expired'));
        setTimeout(() => window.location.href = '/auth/login', 1500);
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error ?? t('promote_error'));
        return;
      }
      toast.success(t('promote_success'));
      fetchUsers();
    } catch {
      toast.dismiss();
      toast.error(t('fetch_user_network_error'));
    }
  };

  const handleDelete = async (id: string) => {
    toast.loading(t('delete_user'));
    try {
      const res = await fetch(`${API_URL}/api/users/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      toast.dismiss();
      if (res.status === 401) {
        toast.error(t('session_expired'));
        setTimeout(() => window.location.href = '/auth/login', 1500);
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error ?? t('delete_error_user'));
        return;
      }
      toast.success(t('delete_success_user'));
      fetchUsers();
    } catch {
      toast.dismiss();
      toast.error(t('fetch_user_network_error'));
    }
  };

  const filtered = users.filter(u => u.username.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
  const paged = filtered.slice((page-1)*pageSize, page*pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <div className="flex min-h-screen sidebar-bg text-gray-900 font-sans">
      <div className="flex flex-col flex-1">
        <main className="p-6 max-w-6xl mx-auto w-full main-bg">
          <h1 className="text-2xl font-bold mb-6 text-green-800">{t('user_list_heading')}</h1>
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
            title={confirm.action === 'promote' ? t('confirm_promote_title') : t('confirm_delete_title')}
            description={confirm.action === 'promote' ? t('confirm_promote_desc') : t('confirm_delete_desc')}
          />
        </main>
      </div>
    </div>
  );
}
