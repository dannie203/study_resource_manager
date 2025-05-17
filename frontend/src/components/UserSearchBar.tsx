import React from 'react';
import { useI18n } from '../context/i18nContext';

interface UserSearchBarProps {
  search: string;
  setSearch: (v: string) => void;
}

export default function UserSearchBar({ search, setSearch }: UserSearchBarProps) {
  const { t } = useI18n();
  return (
    <div className="mb-4 flex items-center gap-4">
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder={t('search')}
        className="border px-3 py-2 rounded-lg w-64"
      />
    </div>
  );
}
