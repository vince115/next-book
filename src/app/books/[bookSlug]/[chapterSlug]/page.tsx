import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import { getChapter, getBook, getAllBooks, getChapters } from '@/lib/books';
import { ChapterContentWrapper } from './_components/ChapterContentWrapper';
import { mdxComponents } from '@/lib/mdx-components';

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
      // 1. Original (Decoded)
      params.push({
        bookSlug: book.slug,
        chapterSlug: chapter.slug,
      });

      // 2. Encoded (Hack for Dev Server matching)
      const encoded = encodeURIComponent(chapter.slug);
      if (encoded !== chapter.slug) {
        params.push({
          bookSlug: book.slug,
          chapterSlug: encoded,
        });
      }
    }
  }
  return params;
}

export default async function ChapterPage({ params }: Props) {
  const { bookSlug, chapterSlug } = await params;
  
  const book = getBook(bookSlug);
  const chapter = getChapter(bookSlug, chapterSlug);
  const chapters = getChapters(bookSlug); // Fetch for Sidebar

  if (!book || !chapter) {
    notFound();
  }

  const options = {
    // @ts-expect-error
    mdxOptions: {
      remarkPlugins: [remarkGfm],
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
    <ChapterContentWrapper 
      bookSlug={bookSlug} 
      chapters={chapters} 
      chapterTitle={chapter.title}
    >
      <MDXRemote 
        source={chapter.content} 
        options={options} 
        components={mdxComponents}
      />
    </ChapterContentWrapper>
  );
}
