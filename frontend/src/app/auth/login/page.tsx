'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
      } else {
        setError(data.error ?? 'Đăng nhập thất bại');
      }
    } catch (err) {
      setError('Có lỗi xảy ra. Vui lòng thử lại.');
      console.error('Lỗi đăng nhập:', err);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="bg-white dark:bg-neutral-900 p-8 rounded-lg shadow-lg w-full max-w-md"
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h1>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium" htmlFor="identifier">
          Email hoặc Username
        </label>
        <input
          id="identifier"
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 text-sm font-medium" htmlFor="password">
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
        Đăng nhập
      </button>
    </form>
  );
}
