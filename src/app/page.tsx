// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-white dark:bg-black transition-colors">

      <div className="max-w-2xl text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          Next Book
        </h1>

        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          A modern reading experience built with Next.js.
          Explore curated books, structured chapters,
          and a GitBook-style documentation system.
        </p>

        <div className="mt-10">
          <Link
            href="/books"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-black text-white dark:bg-white dark:text-black font-medium transition hover:opacity-80"
          >
            Enter Library
          </Link>
        </div>
      </div>

      <footer className="absolute bottom-6 text-sm text-gray-400 dark:text-gray-600">
        © {new Date().getFullYear()} Next Book
      </footer>
    </main>
  );
}