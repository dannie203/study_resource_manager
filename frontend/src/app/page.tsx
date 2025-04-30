export default function LandingPage() {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-neutral-950 px-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Chào mừng đến với Study Resource Manager
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl">
          Nơi quản lý tài nguyên học tập hiệu quả, trực quan và nhanh chóng.
        </p>
        <div className="flex space-x-4">
          <a href="/auth/login" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Đăng nhập
          </a>
          <a href="/auth/register" className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition">
            Tạo tài khoản
          </a>
        </div>
      </main>
    );
  }
  