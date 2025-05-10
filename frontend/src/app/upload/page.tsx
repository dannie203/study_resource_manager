'use client';

import { useState } from 'react';

export default function UploadPage() {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return setMessage('Vui lòng chọn một file.');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subject', subject);
    formData.append('file', file);

    const token = localStorage.getItem('token'); // JWT đã lưu sau khi login

    try {
      setIsSubmitting(true);
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Tải lên thành công!');
        setTitle('');
        setSubject('');
        setFile(null);
      } else {
        setMessage(data.error ?? 'Đã xảy ra lỗi khi tải lên.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Lỗi kết nối đến server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white dark:bg-neutral-900 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Tải tài nguyên lên</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Tiêu đề</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Môn học</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Tệp (.pdf, .docx)</label>
          <input
            type="file"
            className="w-full"
            accept=".pdf,.docx"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Đang tải lên...' : 'Tải lên'}
        </button>
      </form>
      {message && (
        <div
          className={`mt-4 px-4 py-2 rounded text-sm font-medium ${
            message.includes('thành công')
              ? 'bg-green-100 text-green-700 border border-green-300'
              : 'bg-red-100 text-red-700 border border-red-300'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
