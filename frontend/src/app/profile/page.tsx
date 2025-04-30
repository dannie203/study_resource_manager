'use client';

import React, { useEffect, useState } from 'react';

interface UserProfileData {
  username: string;
  email: string;
}

export default function UsersProfile() {
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token is missing');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json(); 
        if (!res.ok) {
          if (data.error === 'Token expired. Please log in again.') {
            localStorage.removeItem('token');
            alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
            window.location.href = '/auth/login';
            return;
          }
          throw new Error(data.error ?? 'Không thể tải thông tin người dùng.');
        }

        setProfile(data);
      } catch (err) {
        console.error('Lỗi khi lấy hồ sơ người dùng:', err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Đang tải thông tin người dùng...</p>;
  if (!profile) return <p>Không thể hiển thị thông tin người dùng.</p>;

  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-neutral-900 shadow">
      <h2 className="text-xl font-bold mb-4">Hồ sơ của bạn</h2>
      <p><strong>Tên:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
    </div>
  );
}
