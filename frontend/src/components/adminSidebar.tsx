import { useState, useEffect } from "react";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger
} from "@/components/ui/sidebar";
import { useI18n } from '../context/i18nContext';
import Link from 'next/link';
import { Menu, LayoutDashboard, Users, BookOpen, Info, ChevronsLeftRight, X } from 'lucide-react'; // Thêm icon X

export default function AdminSidebar() {
  const { t } = useI18n();

  const [isMobileView, setIsMobileView] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkAndSetMobileView = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileView(mobile);
      if (!mobile && isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    checkAndSetMobileView();
    window.addEventListener('resize', checkAndSetMobileView);
    return () => window.removeEventListener('resize', checkAndSetMobileView);
  }, [isMobileMenuOpen]);

  // --- DESKTOP SIDEBAR ---
  if (!isMobileView) {
    return (
      <SidebarProvider>
        <Sidebar
          collapsible="icon"
          data-collapsed={isDesktopCollapsed}
          className={`group bg-gradient-to-b from-[#386641] to-[#2A4B30] text-green-100 min-h-screen border-r border-green-700/30 shadow-[0_0_20px_rgba(56,102,65,0.3)] transition-all duration-300 ease-in-out ${isDesktopCollapsed ? 'w-16 relative' : 'w-64 relative'}`}
        >
          <SidebarHeader className={`py-6 px-4 border-b border-green-700/40 ${isDesktopCollapsed ? 'py-4 px-[1.125rem]' : ''}`}>
            <div className={`flex items-center ${isDesktopCollapsed ? 'justify-center' : 'gap-3'}`}>
              <div className="w-6 h-6 bg-[#A7C957] rounded-full shadow-[0_0_10px_rgba(106,153,78,0.8)] animate-pulse" />
              {!isDesktopCollapsed && (
                <span className="text-2xl font-extrabold tracking-tight text-green-50" style={{ fontFamily: 'Exo, sans-serif' }}>
                  Admin Panel
                </span>
              )}
            </div>
          </SidebarHeader>
          <SidebarTrigger
            className="absolute top-4 -right-4 z-[51] flex text-green-100 bg-[#4A7C59]/80 hover:bg-[#386641]/90 p-1.5 rounded-full shadow transition-colors duration-200 border border-green-700/40"
            onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
          >
            <ChevronsLeftRight className={`w-6 h-6 transition-transform duration-300 ${isDesktopCollapsed ? 'rotate-180' : ''}`} />
          </SidebarTrigger>
          <SidebarContent className="px-2 py-4">
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/admin" className={`flex items-center ${isDesktopCollapsed ? 'justify-center' : 'gap-3'} text-green-100 hover:bg-[#4A7C59]/70 hover:shadow-[0_0_8px_rgba(74,124,89,0.5)] rounded-md px-3 py-2 transition-all duration-200`}>
                      <LayoutDashboard className="w-5 h-5" />
                      {!isDesktopCollapsed && <span>{t('dashboard')}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/admin/resources" className={`flex items-center ${isDesktopCollapsed ? 'justify-center' : 'gap-3'} text-green-100 hover:bg-[#4A7C59]/70 hover:shadow-[0_0_8px_rgba(74,124,89,0.5)] rounded-md px-3 py-2 transition-all duration-200`}>
                      <BookOpen className="w-5 h-5" />
                      {!isDesktopCollapsed && <span>{t('resources')}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/admin/users" className={`flex items-center ${isDesktopCollapsed ? 'justify-center' : 'gap-3'} text-green-100 hover:bg-[#4A7C59]/70 hover:shadow-[0_0_8px_rgba(74,124,89,0.5)] rounded-md px-3 py-2 transition-all duration-200`}>
                      <Users className="w-5 h-5" />
                      {!isDesktopCollapsed && <span>{t('users')}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className={`p-4 border-t border-green-700/40 mt-auto ${isDesktopCollapsed ? 'py-4 px-0' : ''}`}>
            <div className={`flex ${isDesktopCollapsed ? 'justify-center' : 'items-start gap-3'}`}>
              <div className={`p-1 rounded-full ${isDesktopCollapsed ? 'bg-[#6A994E]/50 shadow-[0_0_8px_rgba(106,153,78,0.4)]' : ''}`}>
                <Info className="w-5 h-5 text-green-100" />
              </div>
              {!isDesktopCollapsed && (
                <div className="text-xs text-green-200 bg-[#2A4B30]/60 rounded-md p-3 shadow-[0_0_5px_rgba(56,102,65,0.4)] flex-1">
                  <div className="font-semibold mb-1 text-green-100">{t('system_info')}</div>
                  <div>Study Resource Manager</div>
                  <div>v1.0 © 2025</div>
                  <div>
                    Hỗ trợ: <a href="mailto:mayduahayhoc@gmail.com" className="underline text-green-300 hover:text-green-100">mayduahayhoc@gmail.com</a>
                  </div>
                </div>
              )}
            </div>
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    );
  }

  // --- MOBILE SIDEBAR ---
  return (
    <SidebarProvider>
      <Sidebar
        collapsible="icon"
        className="group bg-gradient-to-b from-[#386641] to-[#2A4B30] text-green-100 min-h-screen border-r border-green-700/30 shadow-[0_0_20px_rgba(56,102,65,0.3)] transition-all duration-300 ease-in-out w-64 fixed inset-y-0 left-0 z-50"
        style={{ transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)', opacity: isMobileMenuOpen ? 1 : 0, pointerEvents: isMobileMenuOpen ? 'auto' : 'none' }}
      >
        <SidebarHeader className="py-6 px-4 border-b border-green-700/40 pt-16">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-[#A7C957] rounded-full shadow-[0_0_10px_rgba(106,153,78,0.8)] animate-pulse" />
            <span className="text-2xl font-extrabold tracking-tight text-green-50" style={{ fontFamily: 'Exo, sans-serif' }}>
              Admin Panel
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent className="px-2 py-4">
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin" className="flex items-center gap-3 text-green-100 hover:bg-[#4A7C59]/70 hover:shadow-[0_0_8px_rgba(74,124,89,0.5)] rounded-md px-3 py-2 transition-all duration-200">
                    <LayoutDashboard className="w-5 h-5" />
                    <span>{t('dashboard')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/resources" className="flex items-center gap-3 text-green-100 hover:bg-[#4A7C59]/70 hover:shadow-[0_0_8px_rgba(74,124,89,0.5)] rounded-md px-3 py-2 transition-all duration-200">
                    <BookOpen className="w-5 h-5" />
                    <span>{t('resources')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/users" className="flex items-center gap-3 text-green-100 hover:bg-[#4A7C59]/70 hover:shadow-[0_0_8px_rgba(74,124,89,0.5)] rounded-md px-3 py-2 transition-all duration-200">
                    <Users className="w-5 h-5" />
                    <span>{t('users')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4 border-t border-green-700/40 mt-auto">
          <div className="flex items-start gap-3">
            <div className="p-1 rounded-full">
              <Info className="w-5 h-5 text-green-100" />
            </div>
            <div className="text-xs text-green-200 bg-[#2A4B30]/60 rounded-md p-3 shadow-[0_0_5px_rgba(56,102,65,0.4)] flex-1">
              <div className="font-semibold mb-1 text-green-100">{t('system_info')}</div>
              <div>Study Resource Manager</div>
              <div>v1.0 © 2025</div>
              <div>
                Hỗ trợ: <a href="mailto:mayduahayhoc@gmail.com" className="underline text-green-300 hover:text-green-100">mayduahayhoc@gmail.com</a>
              </div>
            </div>
          </div>
        </SidebarFooter>
        {/* Nút thu gọn cho mobile */}
        <SidebarTrigger
          className="absolute right-0 top-1/2 -translate-y-1/2 z-[60] flex items-center justify-center p-2 rounded-full text-green-100 bg-[#4A7C59]/80 hover:bg-[#386641]/90 transition-all duration-300 ease-in-out shadow-lg border border-green-700/30"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Thu gọn sidebar"
          aria-expanded={isMobileMenuOpen}
        >
          <X className="w-6 h-6" />
        </SidebarTrigger>
      </Sidebar>
      {/* Nút mở sidebar cho mobile */}
      {!isMobileMenuOpen && (
        <SidebarTrigger
          className="fixed top-4 left-4 z-[60] flex items-center justify-center p-2 rounded-full text-green-100 bg-[#4A7C59]/80 hover:bg-[#386641]/90 transition-all duration-300 ease-in-out shadow-lg border border-green-700/30"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Mở sidebar"
          aria-expanded={isMobileMenuOpen}
        >
          <Menu className="w-6 h-6" />
        </SidebarTrigger>
      )}
    </SidebarProvider>
  );
}