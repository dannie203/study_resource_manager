'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!username.trim()) {
      setError('Vui lòng nhập username.');
      return;
    }
    if (!email.trim()) {
      setError('Vui lòng nhập email.');
      return;
    }
    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Email không hợp lệ.');
      return;
    }
    if (!password.trim() || password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }
  
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setSuccess('Đăng ký thành công! Chuyển hướng đến trang đăng nhập...');
        setTimeout(() => router.push('/auth/login'), 1500); // Fixed redirection
      } else {
        setError(data.error ?? 'Đăng ký thất bại');
      }
    } catch (err) {
      setError('Lỗi không xác định. Vui lòng thử lại.');
      console.error('Lỗi đăng ký:', err);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="bg-white dark:bg-neutral-900 p-8 rounded-lg shadow-lg w-full max-w-md"
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Đăng ký</h1>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

      <div className="mb-4">
        <label htmlFor="username" className="block mb-1 text-sm font-medium">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block mb-1 text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block mb-1 text-sm font-medium">
          Mật khẩu
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
      >
        Đăng ký
      </button>
    </form>
  );
}
