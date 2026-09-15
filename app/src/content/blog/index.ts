import type { BlogPost } from './types';

const modules = import.meta.glob<{ post: BlogPost }>('./posts/*.ts', { eager: true });

/** Articles triés du plus récent au plus ancien */
export const blogPosts: BlogPost[] = Object.values(modules)
  .map((module) => module.post)
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.title.localeCompare(b.title));

export const getBlogPost = (slug: string): BlogPost | undefined =>
  blogPosts.find((post) => post.slug === slug);
