"use client";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from 'react-hot-toast';

interface UserProfileData {
  username: string;
  email: string;
}

export default function UsersProfile() {
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error('Token is missing');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) {
          if (data.error === "Token expired. Please log in again.") {
            localStorage.removeItem("token");
            toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
            window.location.href = "/auth/login";
            return;
          }
          toast.error(data.error ?? 'Không thể tải thông tin người dùng.');
          throw new Error(data.error ?? "Không thể tải thông tin người dùng.");
        }

        setProfile(data);
      } catch (err) {
        toast.error('Lỗi khi lấy hồ sơ người dùng!');
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header title={"Profile"} />
        <main className="p-6 max-w-xl mx-auto w-full">
          <h1 className="text-2xl font-bold mb-6 text-green-800">Thông tin cá nhân</h1>
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <span className="text-green-700 text-lg font-semibold animate-pulse">Đang tải thông tin...</span>
            </div>
          ) : profile ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-gray-500 text-sm">Tên đăng nhập</span>
                <span className="text-lg font-semibold text-green-700">{profile.username}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-gray-500 text-sm">Email</span>
                <span className="text-lg font-semibold text-green-700">{profile.email}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center py-10 text-gray-400">
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="#9ca3af" strokeWidth="2"/><path stroke="#9ca3af" strokeWidth="2" d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4"/></svg>
              <span className="mt-2 text-base">Không thể tải thông tin người dùng.</span>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
