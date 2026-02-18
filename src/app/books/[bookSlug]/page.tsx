import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBook, getChapters, getAllBooks } from '@/lib/books';

interface Props {
  params: Promise<{ bookSlug: string }>;
}

// ⚠️ Required for static export
export async function generateStaticParams() {
  const books = getAllBooks();
  return books.map((book) => ({
    bookSlug: book.slug,
  }));
}

export default async function BookTocPage({ params }: Props) {
  const { bookSlug } = await params;
  const book = getBook(bookSlug);

  if (!book) {
    notFound();
  }

  const chapters = getChapters(bookSlug);

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <Link href="/books" className="text-blue-600 hover:underline mb-8 block dark:text-blue-400">
        ← Back to Library
      </Link>

      <div className="mb-10 border-b border-gray-200 dark:border-gray-800 pb-10">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{book.title}</h1>
        <p className="text-xl text-gray-600 mb-2 dark:text-gray-400">By {book.author}</p>
        <p className="text-gray-500 dark:text-gray-400">{book.description}</p>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Table of Contents</h2>
      <div className="space-y-4">
        {chapters.map((chapter) => (
          <Link
            key={chapter.slug}
            href={`/books/${bookSlug}/${chapter.slug}`}
            className="block p-4 border border-gray-200 dark:border-gray-800 rounded hover:bg-gray-50 dark:hover:bg-gray-900 transition"
          >
            <div className="flex items-center">
              <span className="text-gray-400 font-mono w-12 text-lg">
                {String(chapter.order).padStart(2, '0')}
              </span>
              <span className="text-lg font-medium text-gray-900 dark:text-gray-200">
                {chapter.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
