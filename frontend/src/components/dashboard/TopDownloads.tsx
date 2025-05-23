import React, { useEffect, useState } from "react";
import { useI18n } from '../../context/i18nContext';

type Resource = {
  id: number;
  title: string;
  subject: string;
  downloadCount: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function TopDownloads() {
  const { t } = useI18n();
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/api/resources/top-downloads?limit=5`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then(setResources);
  }, []);

  if (!resources.length) return <div className="py-8 text-center text-green-700 font-semibold">{t('loading_top_downloads')}</div>;

  return (
    <div className="bg-white rounded-2xl p-6 mb-6 shadow border border-gray-100">
      <h3 className="font-semibold mb-4 text-green-800">{t('top_downloads')}</h3>
      <ol className="list-decimal ml-5 space-y-2">
        {resources.map((r, i) => (
          <li key={r.id} className="flex justify-between items-center text-gray-800">
            <span>{r.title} <span className="text-gray-400">({r.subject})</span></span>
            <span className="font-mono text-green-700 font-semibold">{r.downloadCount} {t('downloads_count')}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
