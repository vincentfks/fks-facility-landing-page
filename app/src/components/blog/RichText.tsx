import React from 'react';
import { Link } from 'react-router-dom';
import { INTERNAL_LINK_PATTERN } from '../../content/blog/links';

interface RichTextProps {
  text: string;
}

/** Affiche un texte en convertissant les liens internes [texte](/chemin) en <Link> */
export function RichText({ text }: RichTextProps) {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(INTERNAL_LINK_PATTERN)) {
    const [raw, label, href] = match;
    const start = match.index ?? 0;
    if (start > lastIndex) nodes.push(text.slice(lastIndex, start));
    nodes.push(
      <Link key={`${href}-${start}`} to={href} className="text-primary-600 font-medium underline underline-offset-4 decoration-primary-200 hover:decoration-primary-600">
        {label}
      </Link>,
    );
    lastIndex = start + raw.length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return <>{nodes}</>;
}
