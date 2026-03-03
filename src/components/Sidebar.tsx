"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/contexts/SidebarContext';

export function Sidebar() {
  const { isOpen, bookSlug, chapters } = useSidebar();
  const pathname = usePathname();

  // Hide if no data
  if (!chapters || chapters.length === 0) {
    return null;
  }

  return (
    <aside 
      className={`
        border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950
        transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full opacity-0 overflow-hidden'}
        h-screen overflow-y-auto sticky top-0 shrink-0
        hidden lg:block
      `}
    >
      <div className="p-4 w-64">
        <h3 className="font-semibold mb-4 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Table of Contents
        </h3>
        <nav className="space-y-1">
          {chapters.map((chapter) => {
            // Check active state by URL
            const chapterUrl = `/books/${bookSlug}/${chapter.slug}`;
            // Simple check: current pathname ends with chapter slug?
            // Better: exact match or handled by parent
            const isActive = pathname === chapterUrl || pathname === encodeURI(chapterUrl); // Handle encoded Chinese

            return (
              <Link
                key={chapter.slug}
                href={chapterUrl}
                className={`
                  block px-4 py-2 my-1 rounded-full text-sm transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-100 text-blue-800 dark:bg-[#004a77] dark:text-white font-medium shadow-sm' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50'
                  }
                `}
              >
                <span className={`mr-3 text-xs font-mono inline-block w-5 ${isActive ? 'opacity-80' : 'opacity-40'}`}>
                  {String(chapter.order).padStart(2, '0')}
                </span>
                {chapter.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
