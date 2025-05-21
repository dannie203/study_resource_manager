import React from 'react';
import { useI18n } from '../context/i18nContext';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

interface UserTableRowProps {
  user: User;
  setConfirm: (v: { open: boolean; id: string | null; action: 'promote' | 'delete' | null }) => void;
}

export default function UserTableRow({ user, setConfirm }: UserTableRowProps) {
  const { t } = useI18n();
  return (
    <tr className="border-t">
      <td className="p-3">{user.username}</td>
      <td className="p-3">{user.email}</td>
      <td className="p-3 uppercase font-semibold text-green-700">{t(user.role.toLowerCase())}</td>
      <td className="p-3">{new Date(user.createdAt).toLocaleDateString()}</td>
      <td className="p-3 flex gap-2">
        {user.role !== 'ADMIN' && (
          <button onClick={() => setConfirm({ open: true, id: user.id, action: 'promote' })} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">{t('promote_admin')}</button>
        )}
        <button onClick={() => setConfirm({ open: true, id: user.id, action: 'delete' })} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">{t('delete')}</button>
      </td>
    </tr>
  );
}
