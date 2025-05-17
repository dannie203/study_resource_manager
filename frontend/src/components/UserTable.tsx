import React from 'react';
import { useI18n } from '../context/i18nContext';
import UserSearchBar from './UserSearchBar';
import UserPagination from './UserPagination';
import UserTableRow from './UserTableRow';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

interface UserTableProps {
  users: User[];
  loading: boolean;
  page: number;
  pageSize: number;
  totalPages: number;
  search: string;
  setSearch: (v: string) => void;
  setPage: (v: number) => void;
  onPromote: (id: string) => void;
  onDelete: (id: string) => void;
  setConfirm: (v: { open: boolean; id: string | null; action: 'promote' | 'delete' | null }) => void;
}

export default function UserTable({ users, loading, page, pageSize, totalPages, search, setSearch, setPage, onPromote, onDelete, setConfirm }: UserTableProps) {
  const { t } = useI18n();
  const filtered = users.filter(u => u.username.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
  const paged = filtered.slice((page-1)*pageSize, page*pageSize);

  return (
    <>
      <UserSearchBar search={search} setSearch={setSearch} />
      {loading ? (
        <div className="py-10 text-center text-green-700 font-semibold animate-pulse">{t('loading') ?? 'Đang tải...'}</div>
      ) : (
        <table className="w-full card-bg rounded-2xl shadow border border-gray-100">
          <thead>
            <tr className="bg-green-50 text-green-800">
              <th className="p-3 text-left">{t('username')}</th>
              <th className="p-3 text-left">{t('email')}</th>
              <th className="p-3 text-left">{t('role') ?? 'Role'}</th>
              <th className="p-3 text-left">{t('created_at') ?? 'Ngày tạo'}</th>
              <th className="p-3 text-left">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-8 text-gray-400">{t('no_data') ?? 'Không có dữ liệu'}</td></tr>
            ) : paged.map((u) => (
              <UserTableRow key={u.id} user={u} setConfirm={setConfirm} />
            ))}
          </tbody>
        </table>
      )}
      <UserPagination page={page} totalPages={totalPages} setPage={setPage} />
    </>
  );
}
