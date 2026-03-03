"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSidebar } from "@/contexts/SidebarContext";
import { ChapterMeta } from "@/lib/books";

interface Props {
  bookSlug: string;
  chapters: ChapterMeta[];
  chapterTitle: string;
  children: React.ReactNode; 
}

export function ChapterContentWrapper({ bookSlug, chapters, chapterTitle, children }: Props) {
  const { setSidebarData } = useSidebar();

  useEffect(() => {
    setSidebarData(bookSlug, chapters);
  }, [bookSlug, chapters, setSidebarData]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <div className="mb-8 flex items-center text-sm text-gray-500">
        <Link href="/books" className="hover:underline">Library</Link>
        <span className="mx-2">/</span>
        <Link href={`/books/${bookSlug}`} className="hover:underline">Book</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 dark:text-gray-100 font-medium">{chapterTitle}</span>
      </div>

      <article className="prose prose-lg prose-slate dark:prose-invert max-w-none">
        {children}
      </article>

      <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex justify-between">
        <Link 
          href={`/books/${bookSlug}`}
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          Back to Table of Contents
        </Link>
      </div>
    </div>
  );
}
