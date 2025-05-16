import React from 'react';
import { useI18n } from '../context/i18nContext';

interface ResourceSearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export default function ResourceSearchBar({ value, onChange }: ResourceSearchBarProps) {
  const { t } = useI18n();
  return (
    <div className="mb-4 flex items-center gap-4">
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={t('search')}
        className="border px-3 py-2 rounded-lg w-64"
      />
    </div>
  );
}
