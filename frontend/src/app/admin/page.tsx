export default function AdminDashboardPage() {
  return (
    <main className="p-6 max-w-6xl mx-auto w-full">
      <h1 className="text-3xl font-bold mb-6 text-green-800">Chào mừng đến trang quản trị</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-2 text-green-700">Thống kê hệ thống</h2>
          <ul className="text-gray-700 space-y-2">
            <li>Tổng số người dùng: ...</li>
            <li>Tổng số tài nguyên: ...</li>
            <li>Tài nguyên chờ duyệt: ...</li>
          </ul>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-2 text-green-700">Hoạt động gần đây</h2>
          <ul className="text-gray-700 space-y-2">
            <li>...</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
