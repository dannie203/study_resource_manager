"use client";

import Header from "@/components/header";
import ResourceList from "@/components/ResourceList";
import Sidebar from "@/components/sidebar";
import { Toaster, toast } from 'react-hot-toast';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useI18n } from '@/context/i18nContext';

export default function ResourcesPage() {
  const { isAuthenticated } = useAuth();
  const { t } = useI18n();
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [isAuthenticated, router]);
  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header title={t('resources')} />
        <main className="p-6 max-w-6xl mx-auto w-full main-bg">
          <h1 className="text-2xl font-bold mb-6 text-green-800">{t('your_resources')}</h1>
          <ResourceList />
        </main>
      </div>
    </div>
  );
}
