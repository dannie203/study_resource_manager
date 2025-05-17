'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'vi' | 'en';

interface I18nContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextProps>({
  language: 'vi',
  setLanguage: () => {},
  t: (key) => key,
});

const translations: Record<Language, Record<string, string>> = {
  vi: {
    'login': 'Đăng nhập',
    'register': 'Đăng ký',
    'logout': 'Đăng xuất',
    'username': 'Tên đăng nhập',
    'email': 'Email',
    'password': 'Mật khẩu',
    'search': 'Tìm kiếm...',
    'upload': 'Tải lên',
    'profile': 'Thông tin cá nhân',
    'dashboard': 'Bảng điều khiển',
    'resources': 'Tài nguyên',
    'admin': 'Quản trị',
    'pending': 'Chờ duyệt',
    'approved': 'Đã duyệt',
    'rejected': 'Từ chối',
    'actions': 'Hành động',
    'confirm': 'Xác nhận',
    'cancel': 'Huỷ',
    'system_info': 'Thông tin hệ thống',
    // Dashboard/Stats/Chart
    'total_resources': 'Tổng tài nguyên',
    'total_uploads': 'Lượt tải lên',
    'total_downloads': 'Lượt tải xuống',
    'overview_stats': 'Thống kê tổng quan',
    'approved_resources': 'Tài liệu đã duyệt',
    'downloads': 'Tải xuống',
    'loading_stats': 'Đang tải thống kê...',
    'loading_category_chart': 'Đang tải biểu đồ phân loại...',
    'loading_top_downloads': 'Đang tải top tài nguyên...',
    'category_chart': 'Phân loại tài nguyên',
    'download_chart': 'Lượt tải xuống theo thời gian',
    'top_downloads': 'Top tài nguyên được tải nhiều nhất',
    'downloads_count': 'lượt',
    'day': 'Ngày',
    'week': 'Tuần',
    'month': 'Tháng',
    // Resource/Modal
    'info': 'Thông tin',
    'approve': 'Duyệt',
    'delete': 'Xóa',
    'download': 'Tải về',
    'file_name': 'Tên file',
    'upload_date': 'Ngày tải lên',
    'title': 'Tiêu đề',
    'subject': 'Môn học',
    'status': 'Trạng thái',
    'resource_info': 'Thông tin tài liệu',
    // Loading/Empty/Error
    'loading': 'Đang tải...',
    'no_resource': 'Không có tài liệu nào.',
    // Toast/Notification
    'upload_success': 'Tải lên thành công!',
    'upload_error': 'Đã xảy ra lỗi khi tải lên.',
    'delete_success': 'Đã xóa tài nguyên!',
    'delete_error': 'Xóa tài nguyên thất bại!',
    'approve_success': 'Đã duyệt tài nguyên!',
    'approve_error': 'Duyệt tài nguyên thất bại!',
    'network_error': 'Lỗi kết nối đến server. Vui lòng thử lại sau!',
    'not_logged_in': 'Bạn chưa đăng nhập.',
    'session_expired': 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.',
    // ...bổ sung thêm key nếu cần
  },
  en: {
    'login': 'Login',
    'register': 'Register',
    'logout': 'Logout',
    'username': 'Username',
    'email': 'Email',
    'password': 'Password',
    'search': 'Search...',
    'upload': 'Upload',
    'profile': 'Profile',
    'dashboard': 'Dashboard',
    'resources': 'Resources',
    'users': 'Users',
    'admin': 'Admin',
    'pending': 'Pending',
    'approved': 'Approved',
    'rejected': 'Rejected',
    'actions': 'Actions',
    'confirm': 'Confirm',
    'cancel': 'Cancel',
    'system_info': 'System Info',
    // Dashboard/Stats/Chart (EN)
    'total_resources': 'Total resources',
    'total_uploads': 'Uploads',
    'total_downloads': 'Downloads',
    'overview_stats': 'Overview statistics',
    'approved_resources': 'Approved resources',
    'downloads': 'Downloads',
    'loading_stats': 'Loading statistics...',
    'loading_category_chart': 'Loading category chart...',
    'loading_top_downloads': 'Loading top downloads...',
    'category_chart': 'Resource categories',
    'download_chart': 'Downloads over time',
    'top_downloads': 'Top downloaded resources',
    'downloads_count': 'downloads',
    'day': 'Day',
    'week': 'Week',
    'month': 'Month',
    // Resource/Modal
    'info': 'Info',
    'approve': 'Approve',
    'delete': 'Delete',
    'download': 'Download',
    'file_name': 'File name',
    'upload_date': 'Upload date',
    'title': 'Title',
    'subject': 'Subject',
    'status': 'Status',
    'resource_info': 'Resource info',
    // Loading/Empty/Error
    'loading': 'Loading...',
    'no_resource': 'No resources found.',
    // Toast/Notification
    'upload_success': 'Upload successful!',
    'upload_error': 'Upload failed.',
    'delete_success': 'Resource deleted!',
    'delete_error': 'Failed to delete resource!',
    'approve_success': 'Resource approved!',
    'approve_error': 'Failed to approve resource!',
    'network_error': 'Network/server error. Please try again later!',
    'not_logged_in': 'You are not logged in.',
    'session_expired': 'Session expired. Please log in again.',
    // ...add more keys if needed
  }
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('vi');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const lang = (typeof window !== 'undefined') ? (localStorage.getItem('language') as Language) : 'vi';
    setLanguage(lang || 'vi');
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) localStorage.setItem('language', language);
  }, [language, isReady]);

  const t = (key: string) => translations[language][key] || key;

  if (!isReady) return null;

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
