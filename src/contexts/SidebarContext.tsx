"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface SidebarContextType {
  isOpen: boolean;
  toggle: () => void;
  setOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  // Default true, but we might want to check screen size
  const [isOpen, setIsOpen] = useState(true);

  // Auto-hide on mobile initially
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  }, []);

  const toggle = () => setIsOpen((prev) => !prev);
  const setOpen = (open: boolean) => setIsOpen(open);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    // Fallback context to avoid error if used outside provider (e.g. initial render)
    // Or throw error
    return { isOpen: false, toggle: () => {}, setOpen: () => {} };
  }
  return context;
}
