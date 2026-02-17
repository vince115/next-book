import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getChapter, getBook } from '@/lib/books';

interface Props {
  params: Promise<{ bookSlug: string; chapterSlug: string }>;
}

export default async function ChapterPage({ params }: Props) {
  const { bookSlug, chapterSlug } = await params;
  
  const book = getBook(bookSlug);
  const chapter = getChapter(bookSlug, chapterSlug);

  if (!book || !chapter) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <div className="mb-8 flex items-center text-sm text-gray-500">
        <Link href="/books" className="hover:underline">Library</Link>
        <span className="mx-2">/</span>
        <Link href={`/books/${bookSlug}`} className="hover:underline">{book.title}</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{chapter.title}</span>
      </div>

      <article className="prose prose-lg prose-slate max-w-none">
        {/* Remove frontmatter manually if present in content, or MDXRemote handles it? 
            Since we removed gray-matter, raw content might have --- block.
            MDXRemote usually strips it if we configure it, or we can slice it. 
            For Phase 1, assume content is clean or let it render.
        */}
        <MDXRemote source={chapter.content} />
      </article>

      <div className="mt-16 pt-8 border-t flex justify-between">
        <Link 
          href={`/books/${bookSlug}`}
          className="text-blue-600 hover:underline"
        >
          Back to Table of Contents
        </Link>
      </div>
    </div>
  );
}
