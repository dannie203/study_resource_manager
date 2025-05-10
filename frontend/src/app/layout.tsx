import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/context/authContext';
import { SidebarProvider } from '@/context/sidebarContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Study Resource Manager',
  description: 'một sản phầm của Mấy Đứa Hay Học',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return ( 
    <html lang="vi">
      <body className={`${inter.className} bg-[#121212] text-white min-h-screen`}>
        <AuthProvider>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
