"use client";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { useState, useEffect } from "react";
import { Toaster, toast } from 'react-hot-toast';
import { useI18n } from "@/context/i18nContext";
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function UploadPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [isAuthenticated, router]);
  if (!isAuthenticated) return null;

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useI18n();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (!title.trim()) {
      toast.error(t('upload_required_title'));
      setMessage(t('upload_required_title'));
      return;
    }
    if (!subject.trim()) {
      toast.error(t('upload_required_subject'));
      setMessage(t('upload_required_subject'));
      return;
    }
    if (!file) {
      toast.error(t('upload_required_file'));
      setMessage(t('upload_required_file'));
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subject", subject);
    formData.append("file", file);

    try {
      setIsSubmitting(true);
      toast.loading(t('uploading'));
      const res = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        credentials: 'include',
        body: formData,
      });

      const data = await res.json();
      toast.dismiss();
      if (res.status === 401) {
        toast.error(t('session_expired'));
        setTimeout(() => router.replace('/auth/login'), 1000);
        return;
      }
      if (res.ok) {
        toast.success(t('upload_success'));
        setMessage(t('upload_success'));
        setTitle("");
        setSubject("");
        setFile(null);
      } else {
        toast.error(data.error ?? t('upload_error'));
        setMessage(data.error ?? t('upload_error'));
      }
    } catch (err) {
      toast.dismiss();
      toast.error(t('upload_network_error'));
      setMessage(t('upload_network_error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen main-bg text-[var(--clr-green-dark)] font-sans">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header title={t('upload')} />
        <main className="p-6 max-w-xl mx-auto w-full">
          <h1 className="text-2xl font-bold mb-6 text-[var(--clr-green-dark)]">{t('upload_new_heading')}</h1>
          <form
            onSubmit={handleSubmit}
            className="card-bg rounded-2xl shadow-lg p-8 flex flex-col gap-5 border border-[var(--clr-green-light)]"
          >
            <input
              type="text"
              placeholder={t('upload_title_placeholder')}
              className="input border border-[var(--clr-green-light)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--clr-green)] text-[var(--clr-green-dark)]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder={t('upload_subject_placeholder')}
              className="input border border-[var(--clr-green-light)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--clr-green)] text-[var(--clr-green-dark)]"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            <input
              type="file"
              className="block w-full text-sm text-[var(--clr-green-dark)] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--clr-green-light)] file:text-[var(--clr-green-dark)] hover:file:bg-[var(--clr-green)]"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
            />
            <button
              type="submit"
              className="btn-primary font-semibold rounded-lg px-6 py-2 shadow disabled:opacity-60"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('uploading') : t('upload_button')}
            </button>
            {message && (
              <div className={`text-center text-sm font-medium ${message === t('upload_success') ? 'text-[var(--clr-green)]' : 'text-[var(--clr-red)]'}`}>{message}</div>
            )}
          </form>
        </main>
      </div>
    </div>
  );
}
