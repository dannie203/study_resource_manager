import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-neutral-950 p-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </section>
  );
}
