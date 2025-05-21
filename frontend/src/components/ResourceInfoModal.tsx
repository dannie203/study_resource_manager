import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { useI18n } from '../context/i18nContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface Resource {
  id: number;
  title: string;
  subject: string;
  fileUrl: string;
  originalName: string;
  createdAt: string;
  status?: string;
}

interface ResourceInfoModalProps {
  resource: Resource;
  open: boolean;
  onClose: () => void;
}

export default function ResourceInfoModal({ resource, open, onClose }: ResourceInfoModalProps) {
  const { t } = useI18n();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-6 min-w-[320px] max-w-[90vw] border border-green-700 relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl font-bold">×</button>
        <h2 className="text-xl font-bold text-green-700 mb-2 flex items-center gap-2">
          <InformationCircleIcon className="h-6 w-6" /> {t('resource_info_title')}
        </h2>
        <div className="space-y-2 text-gray-700 dark:text-gray-200">
          <div><span className="font-semibold">{t('title') || 'Tiêu đề'}:</span> {resource.title}</div>
          <div><span className="font-semibold">{t('subject') || 'Môn học'}:</span> {resource.subject}</div>
          <div><span className="font-semibold">{t('file_name') || 'Tên file'}:</span> {resource.originalName}</div>
          <div><span className="font-semibold">{t('upload_date') || 'Ngày tải lên'}:</span> {new Date(resource.createdAt).toLocaleString()}</div>
          <div><span className="font-semibold">{t('status')}:</span> {t(resource.status?.toLowerCase() ?? '')}</div>
          <div><span className="font-semibold">{t('download_link')}:</span> <a href={`${API_URL}/api/resources/download/${resource.fileUrl.split('/').pop()}`} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{t('download')}</a></div>
        </div>
      </div>
    </div>
  );
}
