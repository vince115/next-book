import Link from 'next/link';
import { getAllBooks } from '@/lib/books';

export default function BooksIndexPage() {
  const books = getAllBooks();

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-8">My Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {books.map((book) => (
          <Link 
            key={book.slug} 
            href={`/books/${book.slug}`}
            className="block p-6 border rounded-lg hover:shadow-lg transition bg-white"
          >
            <h2 className="text-xl font-bold mb-2">{book.title}</h2>
            <p className="text-gray-600 mb-4">{book.author}</p>
            <p className="text-gray-500 text-sm">{book.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
