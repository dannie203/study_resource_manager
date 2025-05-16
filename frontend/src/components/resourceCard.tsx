import React, { useState } from 'react';
import {
  DocumentArrowDownIcon,
  LinkIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/authContext';
import ResourceInfoModal from './ResourceInfoModal';
import { useI18n } from '../context/i18nContext';

interface Resource {
  id: number;
  title: string;
  subject: string;
  fileUrl: string;
  originalName: string;
  createdAt: string;
  status?: string;
}

export default function ResourceCard({ resource, onDelete }: { resource: Resource, onDelete?: (id: number) => void }) {
  const { userRole } = useAuth();
  const { t } = useI18n();
  const [showInfo, setShowInfo] = useState(false);
  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    toast.success('Bắt đầu tải file!');
  };

  const handleApprove = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/resources/admin/${resource.id}/approve`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Lỗi khi duyệt tài nguyên');
      toast.success('Đã duyệt tài nguyên!');
      if (onDelete) onDelete(resource.id); // Ẩn khỏi danh sách pending
    } catch {
      toast.error('Duyệt tài nguyên thất bại!');
    }
  };

  
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      let url = '';
      let method = '';
      if (userRole === 'ADMIN') {
        url = `http://localhost:5000/api/resources/admin/${resource.id}`;
        method = 'DELETE';
      } else {
        url = `http://localhost:5000/api/resources/${resource.id}`;
        method = 'DELETE';
      }
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Lỗi khi xóa tài nguyên');
      toast.success('Đã xóa tài nguyên!');
      if (onDelete) onDelete(resource.id);
    } catch {
      toast.error('Xóa tài nguyên thất bại!');
    }
  };

  return (
    <>
      <article className="bg-white rounded-2xl p-5 flex shadow-md border border-gray-100 hover:shadow-lg transition-all min-h-[110px]">
        <div className="flex flex-col flex-1 gap-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-semibold text-green-800 truncate max-w-[60%]">{resource.title}</h3>
            <span className="uppercase text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">{resource.subject}</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            {resource.status === 'PENDING' && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded font-bold">{t('pending')}</span>}
            {resource.status === 'APPROVED' && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">{t('approved')}</span>}
            {resource.status === 'REJECTED' && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold">{t('rejected')}</span>}
          </div>
          <p className="text-xs text-gray-500">{t('file_name') ?? 'Tên file'}: <span className="font-mono text-gray-700">{resource.originalName}</span></p>
          <div className="text-xs text-gray-400 font-mono select-text">{t('upload_date') ?? 'Ngày tải lên'}: {new Date(resource.createdAt).toLocaleDateString()}</div>
          <div className="mt-auto flex items-center justify-between pt-2">
            <a
              href={`http://localhost:5000/api/resources/download/${resource.fileUrl.split('/').pop()}`}
              className="bg-green-600 text-white text-xs px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors font-semibold shadow"
              download={resource.originalName}
              onClick={handleDownload}
            >
              <DocumentArrowDownIcon className="h-4 w-4" />
              Tải về
            </a>
            <div className="flex gap-2">
              <button aria-label="More info" className="text-green-700 hover:text-green-900 text-xs flex items-center gap-1" onClick={() => setShowInfo(true)}>
                <InformationCircleIcon className="h-5 w-5" />
                Thông tin
              </button>
              {/* Chỉ hiển thị nút Duyệt và Xóa cho admin */}
              {userRole === 'ADMIN' && resource.status === 'PENDING' && (
                <button aria-label="Approve" onClick={handleApprove} className="text-green-600 hover:text-green-800 text-xs flex items-center gap-1">
                  <CheckCircleIcon className="h-5 w-5" />
                  Duyệt
                </button>
              )}
              {userRole === 'ADMIN' && (
                <button aria-label="Delete" onClick={handleDelete} className="text-red-600 hover:text-red-800 text-xs flex items-center gap-1">
                  <TrashIcon className="h-5 w-5" />
                  Xóa
                </button>
              )}
            </div>
          </div>
        </div>
      </article>
      <ResourceInfoModal resource={resource} open={showInfo} onClose={() => setShowInfo(false)} />
    </>
  );
}
