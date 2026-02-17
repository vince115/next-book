import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBook, getChapters } from '@/lib/books';

interface Props {
  params: Promise<{ bookSlug: string }>;
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
      <Link href="/books" className="text-blue-500 hover:underline mb-8 block">
        ← Back to Library
      </Link>

      <div className="mb-10 border-b pb-10">
        <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
        <p className="text-xl text-gray-600 mb-2">By {book.author}</p>
        <p className="text-gray-500">{book.description}</p>
      </div>

      <h2 className="text-2xl font-bold mb-6">Table of Contents</h2>
      <div className="space-y-4">
        {chapters.map((chapter) => (
          <Link
            key={chapter.slug}
            href={`/books/${bookSlug}/${chapter.slug}`}
            className="block p-4 border rounded hover:bg-gray-50 transition"
          >
            <div className="flex items-center">
              <span className="text-gray-400 font-mono w-12 text-lg">
                {String(chapter.order).padStart(2, '0')}
              </span>
              <span className="text-lg font-medium text-gray-800">
                {chapter.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
