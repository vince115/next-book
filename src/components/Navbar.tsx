import Link from "next/link";
import { DarkModeToggle } from "./DarkModeToggle";
import { SidebarToggle } from "./SidebarToggle";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link 
            href="/books" 
            className="text-xl font-bold text-gray-900 dark:text-white hover:opacity-80 transition-opacity"
          >
            Next Book
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <SidebarToggle />
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
}
