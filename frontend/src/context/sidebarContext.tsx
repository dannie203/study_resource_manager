'use client';

import { createContext, useContext, useMemo, useState } from 'react';

type SidebarContextType = {
  isCollapsed: boolean;
  toggle: () => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (value: boolean) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggle = () => setIsCollapsed((prev) => !prev);

  const value = useMemo(
    () => ({
      isCollapsed,
      toggle,
      isMobileOpen,
      setIsMobileOpen,
    }),
    [isCollapsed, isMobileOpen]
  );

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
