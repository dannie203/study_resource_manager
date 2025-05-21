import React, { useEffect, useState } from "react";import { useI18n } from '../../context/i18nContext';
import { useAuth } from '../../context/authContext';

export default function StatsOverview() {
  const { t } = useI18n();
  const { userRole } = useAuth();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/resources/stats", {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then(setStats);
  }, []);

  if (!stats) return <div className="py-8 text-center text-[var(--clr-green)] font-semibold">{t('loading_stats')}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {userRole === 'ADMIN' && (
        <div className="card-bg rounded-2xl p-6 text-center shadow border border-[var(--clr-green-light)]">
          <div className="text-3xl font-bold text-[var(--clr-green-dark)]">{stats.totalApprovedResources}</div>
          <div className="text-[var(--clr-green)] mt-2">{t('total_resources_all')}</div>
        </div>
      )}
      <div className="card-bg rounded-2xl p-6 text-center shadow border border-[var(--clr-green-light)]">
        <div className="text-3xl font-bold text-[var(--clr-green-dark)]">{userRole === 'ADMIN' ? stats.userApprovedResources : stats.userApprovedResources}</div>
        <div className="text-[var(--clr-green)] mt-2">{t('total_resources_user')}</div>
      </div>
      {userRole === 'ADMIN' && (
        <div className="card-bg rounded-2xl p-6 text-center shadow border border-[var(--clr-green-light)]">
          <div className="text-3xl font-bold text-[var(--clr-green-dark)]">{stats.adminApprovedResources}</div>
          <div className="text-[var(--clr-green)] mt-2">{t('total_resources_admin')}</div>
        </div>
      )}
      <div className="card-bg rounded-2xl p-6 text-center shadow border border-[var(--clr-green-light)]">
        <div className="text-3xl font-bold text-[var(--clr-green-dark)]">{stats.totalUploads}</div>
        <div className="text-[var(--clr-green)] mt-2">{t('total_uploads_user')}</div>
      </div>
      <div className="card-bg rounded-2xl p-6 text-center shadow border border-[var(--clr-green-light)]">
        <div className="text-3xl font-bold text-[var(--clr-green-dark)]">{stats.totalDownloads}</div>
        <div className="text-[var(--clr-green)] mt-2">{t('total_downloads_user')}</div>
      </div>
    </div>
  );
}
