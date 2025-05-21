"use client";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import React, { useEffect, useRef, useState } from "react";
import { Toaster, toast } from 'react-hot-toast';
import { useI18n } from "@/context/i18nContext";
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';

interface UserProfileData {
  id: string;
  username: string;
  email: string;
  avatar?: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function UsersProfile() {
  const { t } = useI18n();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/api/users/me`, {
          credentials: 'include'
        });
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.error ?? t('avatar_update_error'));
          setProfile(null);
          if (res.status === 401) {
            setTimeout(() => router.replace('/auth/login'), 1000);
          }
        } else {
          setProfile(data);
        }
      } catch (err) {
        toast.error(t('avatar_server_error'));
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [t]);

  // Hàm upload avatar
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error(t('avatar_file_type_error'));
      return;
    }
    const formData = new FormData();
    formData.append('avatar', file);
    setUploading(true);
    try {
      const res = await fetch(`${API_URL}/api/users/me/avatar`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(t('avatar_update_success'));
        setProfile((p) => p ? { ...p, avatar: data.avatar } : p);
      } else {
        toast.error(data.error ?? t('avatar_update_error'));
        if (res.status === 401) {
          setTimeout(() => router.replace('/auth/login'), 1000);
        }
      }
    } catch {
      toast.error(t('avatar_server_error'));
    } finally {
      setUploading(false);
    }
  };

  // State và handler cho upload avatar
  async function handleAvatarUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!avatarFile) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('avatar', avatarFile);
    try {
      const res = await fetch(`${API_URL}/api/users/me/avatar`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.avatar) {
        setProfile(p => p ? { ...p, avatar: data.avatar } : p);
        setAvatarFile(null);
        toast.success(t('avatar_update_success'));
      } else {
        toast.error(data.error ?? t('avatar_update_error'));
        if (res.status === 401) {
          setTimeout(() => router.replace('/auth/login'), 1000);
        }
      }
    } catch {
      toast.error(t('avatar_server_error'));
    } finally {
      setUploading(false);
    }
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen main-bg text-[var(--clr-green-dark)] font-sans">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header title={t('profile')} />
        <main className="p-6 max-w-xl mx-auto w-full">
          <h1 className="text-2xl font-bold mb-6 text-[var(--clr-green-dark)]">{t('profile_info')}</h1>
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <span className="text-[var(--clr-green)] text-lg font-semibold animate-pulse">{t('loading_profile')}</span>
            </div>
          ) : profile ? (
            <div className="card-bg rounded-2xl shadow-lg p-8 border border-[var(--clr-green-light)] flex flex-col gap-4 items-center w-full max-w-md mx-auto mt-4 md:mt-0">
              {/* Avatar */}
              {profile.avatar && typeof profile.avatar === 'string' && profile.avatar.trim() !== '' ? (
                <img
                  src={`http://localhost:5000${profile.avatar}`}
                  alt={profile.username + ' avatar'}
                  className="w-24 h-24 rounded-full object-cover border-4 border-[var(--clr-green-light)] mb-2 shadow-md transition-all duration-200 md:w-28 md:h-28 sm:w-20 sm:h-20 bg-white"
                  onError={e => { (e.target as HTMLImageElement).src = getDefaultAvatar(profile); }}
                />
              ) : (
                <img
                  src={getDefaultAvatar(profile)}
                  alt={profile.username + ' default avatar'}
                  className="w-24 h-24 rounded-full object-cover border-4 border-[var(--clr-green-light)] mb-2 shadow-md transition-all duration-200 md:w-28 md:h-28 sm:w-20 sm:h-20 bg-white"
                />
              )}
              <form
                className="flex flex-col items-center gap-2 mt-2 w-full max-w-xs"
                onSubmit={handleAvatarUpload}
                encType="multipart/form-data"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setAvatarFile(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-[var(--clr-green-dark)] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--clr-green-light)] file:text-[var(--clr-green-dark)] hover:file:bg-[var(--clr-green)]"
                />
                <button
                  type="submit"
                  className="btn-primary px-4 py-1 text-sm font-semibold disabled:opacity-60 w-full"
                  disabled={!avatarFile || uploading}
                >
                  {uploading ? t('updating_avatar') : t('update_avatar')}
                </button>
              </form>
              <div className="flex flex-col gap-2 w-full">
                <span className="text-[var(--clr-green)] text-sm">{t('user_id')}</span>
                <span className="text-lg font-semibold text-[var(--clr-green-dark)]">{profile.id}</span>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <span className="text-[var(--clr-green)] text-sm">{t('username')}</span>
                <span className="text-lg font-semibold text-[var(--clr-green-dark)]">{profile.username}</span>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <span className="text-[var(--clr-green)] text-sm">{t('email')}</span>
                <span className="text-lg font-semibold text-[var(--clr-green-dark)]">{profile.email}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center py-10 text-gray-400">
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="#9ca3af" strokeWidth="2"/><path stroke="#9ca3af" strokeWidth="2" d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4"/></svg>
              <span className="mt-2 text-base">{t('profile_load_error')}</span>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Thêm hàm md5 nhỏ gọn để lấy hash email cho gravatar
function md5(str: string): string {
  // Đơn giản: dùng crypto nếu có, hoặc fallback js
  if (typeof window !== 'undefined' && (window as any).crypto?.subtle) {
    // Không đồng bộ, chỉ dùng cho SSR hoặc nodejs
    return '';
  }
  // Fallback: simple js hash (không bảo mật, chỉ để demo gravatar)
  let hash = 0, i, chr;
  if (str.length === 0) return '';
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return Math.abs(hash).toString(16);
}

// Hàm chọn avatar mặc định đẹp, không trùng với uploads
function getDefaultAvatar(profile: UserProfileData) {
  // Ưu tiên Gravatar nếu có email, nếu không thì dùng Dicebear hoặc UI Avatars
  if (profile.email) {
    const hash = md5(profile.email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?d=mp&s=96`;
  }
  // Fallback: UI Avatars
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.username || 'User')}&background=E5E7EB&color=10B981&size=96`;
}
