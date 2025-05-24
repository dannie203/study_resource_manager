"use client";

import { useState } from "react";
import { useI18n } from "@/context/i18nContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const ForgotPasswordPage = () => {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/api/auth/request-reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message ?? "If that email exists, a reset link has been sent.");
      } else {
        setMessage(data.error ?? "An error occurred. Please try again.");
      }
    } catch (error) {
      setMessage("Cannot connect to the server. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white dark:bg-neutral-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">{t('forgot_password')}</h1>
        {message && <p className="mb-4 text-center text-sm text-gray-700 dark:text-gray-200">{message}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-sm font-medium">
            {t('email_address')}
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
        >
          {isSubmitting ? t('sending') : t('send_reset_link')}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
