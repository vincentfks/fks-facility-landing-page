import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { getBlogPost } from '../../content/blog';
import { RichText } from '../../components/blog/RichText';
import { Button } from '../../components/ui/Button';
import { formatFrenchDate } from '../../lib/utils';
import { NotFound } from '../NotFound';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) return <NotFound />;

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <nav aria-label="Fil d'Ariane" className="text-sm text-gray-500 mb-8">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-primary-600">Accueil</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to="/blog" className="hover:text-primary-600">Blog</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-700 line-clamp-1">{post.title}</li>
          </ol>
        </nav>

        <header className="mb-10">
          <p className="text-primary-600 font-medium mb-3">{post.category}</p>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-gray-500">
            <span>Par l'équipe FKS Facility</span>
            <time dateTime={post.updatedAt}>Mis à jour le {formatFrenchDate(post.updatedAt)}</time>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-4 h-4" aria-hidden="true" />
              {post.readingMinutes} min de lecture
            </span>
          </div>
        </header>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10 text-gray-700 text-lg leading-relaxed space-y-10">
          <div className="space-y-5">
            {post.intro.map((paragraph, index) => (
              <p key={index}><RichText text={paragraph} /></p>
            ))}
          </div>

          {post.sections.map((section) => (
            <section key={section.heading} className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 leading-snug">{section.heading}</h2>
              {section.paragraphs.map((paragraph, index) => (
                <p key={index}><RichText text={paragraph} /></p>
              ))}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="list-disc pl-6 space-y-2 marker:text-primary-500">
                  {section.bullets.map((bullet, index) => (
                    <li key={index}><RichText text={bullet} /></li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {post.faq.length > 0 && (
            <section className="space-y-6 border-t border-gray-200 pt-10">
              <h2 className="text-2xl font-bold text-gray-900">Questions fréquentes</h2>
              <dl className="space-y-6">
                {post.faq.map((item) => (
                  <div key={item.question}>
                    <dt className="font-semibold text-gray-900 mb-2">{item.question}</dt>
                    <dd className="text-gray-700"><RichText text={item.answer} /></dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>

        <aside className="mt-10 bg-gray-900 text-white rounded-2xl p-6 md:p-10">
          <h2 className="text-2xl font-bold mb-3">Combien pourriez-vous économiser ?</h2>
          <p className="text-gray-300 mb-6">
            FKS Facility négocie vos achats généraux auprès de fournisseurs partenaires, sans minimum d'achat.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/simuler-mes-economies">
              <Button size="lg" className="h-auto min-h-14 py-3 bg-white text-gray-900 hover:bg-gray-100 border-0">Simuler mes économies</Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="h-auto min-h-14 py-3 bg-transparent border-gray-500 text-white hover:bg-gray-800 hover:border-gray-400 hover:text-white">Demander un audit gratuit</Button>
            </Link>
          </div>
        </aside>

        {post.relatedLinks.length > 0 && (
          <nav aria-label="Pour aller plus loin" className="mt-10">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Pour aller plus loin</h2>
            <ul className="space-y-2">
              {post.relatedLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-primary-600 hover:text-primary-700 underline underline-offset-4">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="mt-10">
          <Link to="/blog">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-primary-600 -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
              Tous les articles
            </Button>
          </Link>
        </div>
      </article>
    </div>
  );
};
