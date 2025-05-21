"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const ForgotPasswordPage = () => {
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
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4">Quên mật khẩu</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Địa chỉ Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          {isSubmitting ? "Đang gửi..." : "Gửi liên kết đặt lại"}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default ForgotPasswordPage;
