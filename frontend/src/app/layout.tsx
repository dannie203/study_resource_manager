"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Splash from "@/components/splash";
import Head from "next/head";
import { SidebarProvider } from "@/context/sidebarContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pathname === "/") {
      const timer = setTimeout(() => setLoading(false), 3000);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [pathname]);

  return (
    <html lang="vi">
      <Head>
        <title>Mấy Đứa Hay Học</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <SidebarProvider>
          {loading ? <Splash /> : children}
        </SidebarProvider>
      </body>
    </html>
  );
}
