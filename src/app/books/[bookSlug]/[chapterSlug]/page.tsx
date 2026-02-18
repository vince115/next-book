import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import { getChapter, getBook, getAllBooks, getChapters } from '@/lib/books';
import { Sidebar } from '@/components/Sidebar';

interface Props {
  params: Promise<{ bookSlug: string; chapterSlug: string }>;
}

// ⚠️ Required for static export
export async function generateStaticParams() {
  const books = getAllBooks();
  const params: { bookSlug: string; chapterSlug: string }[] = [];

  for (const book of books) {
    const chapters = getChapters(book.slug);
    for (const chapter of chapters) {
      // console.log(`[StaticParams] Generating: ${book.slug} / ${chapter.slug}`);
      params.push({
        bookSlug: book.slug,
        chapterSlug: chapter.slug, // 這裡傳入的是原始中文 "人與金錢"
      });
    }
  }
  return params;
}

export default async function ChapterPage({ params }: Props) {
  const { bookSlug, chapterSlug } = await params;
  
  const book = getBook(bookSlug);
  const chapter = getChapter(bookSlug, chapterSlug);

  if (!book || !chapter) {
    notFound();
  }

  const chapters = getChapters(bookSlug);

  const options = {
    mdxOptions: {
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: 'github-dark',
            keepBackground: true,
          },
        ],
      ],
    },
  };

  return (
    <div className="flex w-full">
      <Sidebar bookSlug={bookSlug} chapters={chapters} currentSlug={chapterSlug} />

      <div className="flex-1 min-w-0"> {/* min-w-0 prevents flex child from overflowing */}
        <div className="max-w-4xl mx-auto py-10 px-6">
          <div className="mb-8 flex items-center text-sm text-gray-500">
            <Link href="/books" className="hover:underline">Library</Link>
            <span className="mx-2">/</span>
            <Link href={`/books/${bookSlug}`} className="hover:underline">{book.title}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-gray-100">{chapter.title}</span>
          </div>

          <article className="prose prose-lg prose-slate dark:prose-invert max-w-none">
            {/* @ts-expect-error Async Server Component */}
            <MDXRemote source={chapter.content} options={options} />
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
      </div>
    </div>
  );
}
