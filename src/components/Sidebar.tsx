"use client";

import Link from 'next/link';
import { ChapterMeta } from '@/lib/books';
import { useSidebar } from '@/contexts/SidebarContext';

interface SidebarProps {
  bookSlug: string;
  chapters: ChapterMeta[];
  currentSlug?: string;
}

export function Sidebar({ bookSlug, chapters, currentSlug }: SidebarProps) {
  const { isOpen } = useSidebar();

  return (
    <aside 
      className={`
        border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950
        transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full opacity-0 overflow-hidden'}
        h-[calc(100vh-4rem)] overflow-y-auto sticky top-16 shrink-0
        hidden lg:block
      `}
    >
      <div className="p-4 w-64"> {/* Fixed width container inside to prevent text wrap animation issues */}
        <h3 className="font-semibold mb-4 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Table of Contents
        </h3>
        <nav className="space-y-1">
          {chapters.map((chapter) => {
            const isActive = currentSlug === chapter.slug;
            return (
              <Link
                key={chapter.slug}
                href={`/books/${bookSlug}/${chapter.slug}`}
                className={`
                  block px-3 py-2 rounded-md text-sm transition-colors
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }
                `}
              >
                <span className="mr-2 text-xs opacity-50 font-mono">
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
