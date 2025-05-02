"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null); // null = loading

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValidToken(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/api/auth/validate-reset-token?token=${token}`);
        setIsValidToken(res.ok);
      } catch (err) {
        setIsValidToken(false);
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/reset-password", {
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
    return <p className="text-center mt-10">🔄 Đang kiểm tra token...</p>;
  }

  if (!isValidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-red-600">
        <p>❌ Token không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu lại liên kết đặt lại mật khẩu.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4">Đặt lại mật khẩu</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="password"
          placeholder="Mật khẩu mới"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md"
        >
          Đặt lại mật khẩu
        </button>
      </form>
      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default ResetPasswordPage;
