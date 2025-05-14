"use client";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { useState } from "react";
import { Toaster, toast } from 'react-hot-toast';

export default function UploadPage() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error('Vui lòng chọn một file.');
      return setMessage('Vui lòng chọn một file.');
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subject", subject);
    formData.append("file", file);

    const token = localStorage.getItem("token"); // JWT đã lưu sau khi login

    try {
      setIsSubmitting(true);
      toast.loading('Đang tải lên...');
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      toast.dismiss();
      if (res.ok) {
        toast.success('Tải lên thành công!');
        setMessage('Tải lên thành công!');
        setTitle("");
        setSubject("");
        setFile(null);
      } else {
        toast.error(data.error ?? 'Đã xảy ra lỗi khi tải lên.');
        setMessage(data.error ?? 'Đã xảy ra lỗi khi tải lên.');
      }
    } catch (err) {
      toast.dismiss();
      toast.error('Lỗi kết nối đến server.');
      setMessage('Lỗi kết nối đến server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header title={"Upload"} />
        <main className="p-6 max-w-xl mx-auto w-full">
          <h1 className="text-2xl font-bold mb-6 text-green-800">Tải lên tài liệu mới</h1>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-5 border border-gray-100"
          >
            <input
              type="text"
              placeholder="Tiêu đề tài liệu"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Môn học"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            <input
              type="file"
              className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
            />
            <button
              type="submit"
              className="bg-green-600 text-white font-semibold rounded-lg px-6 py-2 shadow hover:bg-green-700 transition-colors disabled:opacity-60"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang tải lên...' : 'Tải lên'}
            </button>
            {message && (
              <div className={`text-center text-sm font-medium ${message.includes('thành công') ? 'text-green-600' : 'text-red-500'}`}>{message}</div>
            )}
          </form>
        </main>
      </div>
    </div>
  );
}
