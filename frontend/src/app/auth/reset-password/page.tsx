"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18n } from "../../../context/i18nContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const { t } = useI18n();

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null); 

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValidToken(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/auth/validate-reset-token?token=${token}`);
        setIsValidToken(res.ok);
      } catch (err) {
        setIsValidToken(false);
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await res.json();
    setMessage(res.ok ? data.message : data.error);

    if (res.ok) {
      setTimeout(() => router.push("/auth/login"), 3000);
    }
  };

  if (isValidToken === null) {
    return <p className="text-center mt-10">{t('resetPassword.checkingToken')}</p>;
  }

  if (!isValidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-red-600">
        <p>{t('resetPassword.invalidToken')}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4">{t('resetPassword.title')}</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="password"
          placeholder={t('resetPassword.newPasswordPlaceholder')}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md"
        >
          {t('resetPassword.submitBtn')}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default ResetPasswordPage;
