"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { ChapterMeta } from "@/lib/books";

interface SidebarContextType {
  isOpen: boolean;
  toggle: () => void;
  setOpen: (open: boolean) => void;
  
  // Data for Global Sidebar
  bookSlug: string;
  chapters: ChapterMeta[];
  setSidebarData: (slug: string, data: ChapterMeta[]) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  
  const [bookSlug, setBookSlug] = useState("");
  const [chapters, setChapters] = useState<ChapterMeta[]>([]);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  }, []);

  const toggle = () => setIsOpen((prev) => !prev);
  const setOpen = (open: boolean) => setIsOpen(open);
  
  const setSidebarData = (slug: string, data: ChapterMeta[]) => {
    setBookSlug(slug);
    setChapters(data);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, setOpen, bookSlug, chapters, setSidebarData }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    return { 
      isOpen: false, toggle: () => {}, setOpen: () => {},
      bookSlug: "", chapters: [], setSidebarData: () => {} 
    };
  }
  return context;
}
