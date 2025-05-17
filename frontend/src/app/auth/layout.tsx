import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-6">
          <img src="/favicon.ico" alt="Logo" className="w-8 h-8" />
          <span className="text-2xl font-bold text-green-700 tracking-wide">Study Manager</span>
        </div>
        {children}
      </div>
    </section>
  );
}
