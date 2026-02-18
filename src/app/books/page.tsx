import Link from 'next/link';
import { getAllBooks } from '@/lib/books';

export default function BooksIndexPage() {
  const books = getAllBooks();

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">My Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {books.map((book) => (
          <Link 
            key={book.slug} 
            href={`/books/${book.slug}`}
            className="block p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-lg transition bg-white dark:bg-gray-900"
          >
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{book.title}</h2>
            <p className="text-gray-600 mb-4 dark:text-gray-400">{book.author}</p>
            <p className="text-gray-500 text-sm dark:text-gray-400">{book.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
