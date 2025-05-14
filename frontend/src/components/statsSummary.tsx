import React from 'react';
import {
  DocumentTextIcon,
  UsersIcon,
  CloudArrowDownIcon,
} from '@heroicons/react/24/outline';

export default function StatsSummary() {
  return (
    <section className="bg-white rounded-2xl p-8 shadow-lg mb-8 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-green-800 flex items-center gap-2">
        <DocumentTextIcon className="w-7 h-7 text-green-600" /> Thống kê tổng quan
      </h2>
      <div className="flex gap-8 justify-between">
        <div className="flex flex-col items-center flex-1 bg-green-50 rounded-xl p-5 shadow-sm">
          <CloudArrowDownIcon className="w-8 h-8 text-green-500 mb-2" />
          <div className="text-3xl font-bold text-green-700">12</div>
          <div className="text-gray-600 mt-1">Tài liệu</div>
        </div>
        <div className="flex flex-col items-center flex-1 bg-green-50 rounded-xl p-5 shadow-sm">
          <UsersIcon className="w-8 h-8 text-green-500 mb-2" />
          <div className="text-3xl font-bold text-green-700">5</div>
          <div className="text-gray-600 mt-1">Tải lên</div>
        </div>
        <div className="flex flex-col items-center flex-1 bg-green-50 rounded-xl p-5 shadow-sm">
          <DocumentTextIcon className="w-8 h-8 text-green-500 mb-2" />
          <div className="text-3xl font-bold text-green-700">3</div>
          <div className="text-gray-600 mt-1">Tải xuống</div>
        </div>
      </div>
    </section>
  );
}