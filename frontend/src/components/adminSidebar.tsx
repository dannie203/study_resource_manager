import Link from 'next/link';

export default function AdminSidebar() {
  return (
    <aside className="w-56 min-h-screen bg-gradient-to-b from-green-900 to-green-600 flex flex-col p-6 rounded-r-3xl shadow-lg">
      <div className="font-extrabold text-2xl text-white mb-8 tracking-wide flex items-center gap-2">
        Admin Panel
      </div>
      <nav className="flex flex-col gap-5">
        <Link href="/admin" className="text-white hover:bg-green-800 px-3 py-2 rounded-lg transition-colors font-medium">Dashboard</Link>
        <Link href="/admin/resources" className="text-white hover:bg-green-800 px-3 py-2 rounded-lg transition-colors font-medium">Quản lý tài nguyên</Link>
        <Link href="/admin/users" className="text-white hover:bg-green-800 px-3 py-2 rounded-lg transition-colors font-medium">Quản lý người dùng</Link>
      </nav>
    </aside>
  );
}
