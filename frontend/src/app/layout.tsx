"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Splash from "@/components/splash";

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
      <head>
        <title>Mấy Đứa Hay Học</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {loading ? <Splash /> : children}
      </body>
    </html>
  );
}
