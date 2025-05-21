import Link from 'next/link';
import { useI18n } from '../context/i18nContext';

export default function AdminSidebar() {
  const { t } = useI18n();

  return (
    <aside className="w-56 min-h-screen bg-gradient-to-b from-green-900 to-green-600 flex flex-col p-6 rounded-r-3xl shadow-lg relative">
      <div className="font-extrabold text-2xl text-white mb-8 tracking-wide flex items-center gap-2">
        {t('admin_panel')}
      </div>
      <nav className="flex flex-col gap-5 flex-1">
        <Link href="/admin" className="text-white hover:bg-green-800 px-3 py-2 rounded-lg transition-colors font-medium">{t('dashboard')}</Link>
        <Link href="/admin/resources" className="text-white hover:bg-green-800 px-3 py-2 rounded-lg transition-colors font-medium">{t('resources')}</Link>
        <Link href="/admin/users" className="text-white hover:bg-green-800 px-3 py-2 rounded-lg transition-colors font-medium">{t('users')}</Link>
      </nav>
      <div className="mt-auto mb-2 w-full flex justify-center">
        <div className="text-xs text-green-50 bg-green-900 bg-opacity-80 rounded-md p-2 w-[90%] flex flex-col items-start gap-1 shadow border border-green-700">
          <div className="flex items-center gap-1 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9.75h.008v.008H11.25V9.75zm.75 3v-1.5m0 0a.75.75 0 10-1.5 0v1.5a.75.75 0 001.5 0zm0 0v1.5m0 0a.75.75 0 01-1.5 0v-1.5a.75.75 0 011.5 0z" /><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /></svg>{t('system_info')}
          </div>
          <div>{t('admin_product_name')}</div>
          <div>{t('admin_version')}</div>
          <div>{t('admin_support')}: <a href="mailto:mayduahayhoc@gmail.com" className="underline text-blue-200">{t('admin_support_email')}</a></div>
        </div>
      </div>
    </aside>
  );
}
