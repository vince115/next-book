"use client";

import { Menu } from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";

export function SidebarToggle() {
  const { toggle } = useSidebar();

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300 mr-2"
      aria-label="Toggle Sidebar"
    >
      <Menu size={20} />
    </button>
  );
}
