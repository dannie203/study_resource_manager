"use client";
import { InformationCircleIcon } from '@heroicons/react/24/outline';

export default function AdminInfoPage() {
  return (
    <main className="p-6 max-w-3xl mx-auto w-full main-bg">
      <div className="flex items-center gap-3 mb-6">
        <div className="border-2 border-green-700 rounded-full p-2">
          <InformationCircleIcon className="w-8 h-8 text-green-700" />
        </div>
        <h1 className="text-2xl font-bold text-green-700">Thông tin</h1>
      </div>
      <div className="card-bg rounded-2xl shadow p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-2 text-green-700">Giới thiệu hệ thống</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          Study Resource Manager là hệ thống quản lý tài nguyên học tập, hỗ trợ upload, duyệt, phân quyền và thống kê tài nguyên cho cả người dùng và admin.
        </p>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200">
          <li>Quản lý tài nguyên học tập (upload, duyệt, xóa, phân loại...)</li>
          <li>Phân quyền rõ ràng giữa user và admin</li>
          <li>Thống kê tổng quan hệ thống, hoạt động gần đây</li>
          <li>Giao diện hiện đại, hỗ trợ dark/light mode</li>
        </ul>
        <div className="mt-6">
          <h3 className="font-semibold text-green-700 mb-1">Thông tin liên hệ</h3>
          <p className="text-gray-700 dark:text-gray-200">Liên hệ hỗ trợ: <a href="mailto:support@example.com" className="text-blue-600 underline">support@example.com</a></p>
        </div>
      </div>
    </main>
  );
}
