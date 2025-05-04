export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-neutral-950 px-4">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        Chào mừng đến với Mấy Đứa Hay Học
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl">
        TRUNG TÂM QUẢN LÝ TÀI LIỆU CỦA MẤY ĐỨA HAY HỌC
      </p>
      
      {/* Group all buttons vertically */}
      <div className="flex flex-col items-center space-y-2">
        <div className="flex space-x-4">
          <a
            href="/auth/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Đăng nhập
          </a>
          <a
            href="/auth/register"
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition"
          >
            Tạo tài khoản
          </a>
        </div>

        {/* Smaller forgot password button centered below */}
        <a
          href="/auth/forgot-password"
          className="text-sm text-blue-500 hover:underline"
        >
          Quên mật khẩu?
        </a>
      </div>
    </main>
  );
}
