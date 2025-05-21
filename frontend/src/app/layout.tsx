import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './providers';
import { I18nProvider } from '../context/i18nContext';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Study Resource Manager',
  description: 'một sản phầm của Mấy Đứa Hay Học',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return ( 
    <html lang="vi">
      <body className={`${inter.className} min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors`}>
        <I18nProvider>
          <Providers>
            {children}
          </Providers>
        </I18nProvider>
      </body>
    </html>
  );
}
