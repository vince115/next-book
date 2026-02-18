import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const booksDirectory = path.join(process.cwd(), 'content/books');

export interface BookMeta {
  title: string;
  author: string;
  description: string;
  coverImage?: string;
  slug: string; // folder name
}

export interface ChapterMeta {
  title: string;
  slug: string; // url slug (no number prefix)
  fileName: string; // original filename
  order: number; // extracted from filename prefix
}

export interface ChapterContent extends ChapterMeta {
  content: string; // raw MDX content
}

/**
 * Helper: Title case from slug (e.g. "meaningful-names" -> "Meaningful Names")
 */
function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get all books (read meta.json from each folder)
 */
export function getAllBooks(): BookMeta[] {
  if (!fs.existsSync(booksDirectory)) return [];

  const bookFolders = fs.readdirSync(booksDirectory).filter(file => {
    return fs.statSync(path.join(booksDirectory, file)).isDirectory();
  });

  const books = bookFolders.map(folder => {
    const metaPath = path.join(booksDirectory, folder, 'meta.json');
    if (!fs.existsSync(metaPath)) return null;
    
    try {
      const metaContent = fs.readFileSync(metaPath, 'utf8');
      const meta = JSON.parse(metaContent);
      return { ...meta, slug: folder };
    } catch (e) {
      console.error(`Error parsing meta.json for ${folder}`, e);
      return null;
    }
  }).filter((b): b is BookMeta => b !== null);

  return books;
}

/**
 * Get single book meta
 */
export function getBook(slug: string): BookMeta | null {
  const metaPath = path.join(booksDirectory, slug, 'meta.json');
  if (!fs.existsSync(metaPath)) return null;

  try {
    const metaContent = fs.readFileSync(metaPath, 'utf8');
    const meta = JSON.parse(metaContent);
    return { ...meta, slug };
  } catch (e) {
    return null;
  }
}

/**
 * Get all chapters for a book (sorted by filename)
 */
export function getChapters(bookSlug: string): ChapterMeta[] {
  const bookDir = path.join(booksDirectory, bookSlug);
  if (!fs.existsSync(bookDir)) return [];

  const files = fs.readdirSync(bookDir).filter(file => file.endsWith('.mdx'));

  const chapters = files.map(fileName => {
    // Filename parsing: "01-intro.mdx" -> order: 1, slug: "intro"
    const match = fileName.match(/^(\d+)-(.+)\.mdx$/);
    const order = match ? parseInt(match[1], 10) : 999;
    const slug = match ? match[2] : fileName.replace(/\.mdx$/, '');
    
    // Read frontmatter for title
    const fullPath = path.join(bookDir, fileName);
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContent);

    // Use frontmatter title or fallback to slug
    const title = data.title || slugToTitle(slug);

    return {
      title,
      slug,
      fileName,
      order,
    };
  });

  // Sort by order
  return chapters.sort((a, b) => a.order - b.order);
}

/**
 * Get single chapter content
 */
export function getChapter(bookSlug: string, chapterSlug: string): ChapterContent | null {
  const chapters = getChapters(bookSlug);
  const chapter = chapters.find(c => c.slug === chapterSlug);

  if (!chapter) return null;

  const fullPath = path.join(booksDirectory, bookSlug, chapter.fileName);
  const fileContent = fs.readFileSync(fullPath, 'utf8');
  const { content, data } = matter(fileContent); // Parse frontmatter

  return {
    ...chapter,
    title: data.title || chapter.title,
    content, // Clean content without frontmatter
  };
}
