import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { blogPosts } from '../../content/blog';
import { formatFrenchDate } from '../../lib/utils';

export const BlogIndex: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-primary-500 font-medium mb-3">| BLOG</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Achats généraux et frais généraux : nos guides pour TPE et PME
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Centrale d'achat, centrale de référencement, cartons et emballages, snacking, fournitures de bureau :
            des conseils concrets pour acheter mieux et réduire vos coûts, en Île-de-France comme partout en France.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ul className="grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => (
            <li key={post.slug}>
              <article className="h-full bg-white rounded-2xl border border-gray-200 p-6 lg:p-8 flex flex-col gap-4 hover:border-primary-300 hover:shadow-md transition-all">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                  <span className="text-primary-600 font-medium">{post.category}</span>
                  <time dateTime={post.publishedAt}>{formatFrenchDate(post.publishedAt)}</time>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                    {post.readingMinutes} min
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 leading-snug">
                  <Link to={`/blog/${post.slug}`} className="hover:text-primary-600">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 leading-relaxed flex-grow">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
                  aria-label={`Lire l'article : ${post.title}`}
                >
                  Lire l'article
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
