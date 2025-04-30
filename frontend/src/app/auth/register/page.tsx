'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
  
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
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
