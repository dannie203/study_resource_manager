'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/context/i18nContext';

export default function LoginPage() {
  const router = useRouter();
  const { t } = useI18n();
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
    if (!identifier.trim()) {
      setError(t('please_enter_email_or_username'));
      return;
    }
    if (!password.trim()) {
      setError(t('please_enter_password'));
      return;
    }

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
        window.location.reload(); // Reload để AuthProvider cập nhật context
      } else {
        setError(data.error ?? t('login_failed'));
      }
    } catch (err) {
      setError(t('error_occurred'));
      console.error('Lỗi đăng nhập:', err);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="bg-white dark:bg-neutral-900 p-8 rounded-lg shadow-lg w-full max-w-md"
    >
      <h1 className="text-2xl font-bold mb-6 text-center">{t('login')}</h1>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium" htmlFor="identifier">
          {t('email')} {t('or')} {t('username')}
        </label>
        <input
          id="identifier"
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={t('email') + ' / ' + t('username')}
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 text-sm font-medium" htmlFor="password">
          {t('password')}
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={t('password')}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
      >
        {t('login')}
      </button>
    </form>
  );
}
