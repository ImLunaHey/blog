import { HTMLAttributes } from 'react';

export const Image: React.FC<HTMLAttributes<HTMLImageElement> & { src: string; alt?: string }> = ({ src, alt }) => {
  if (!alt) {
    return <img className="h-auto max-w-full rounded-lg" src={src} />;
  }

  return (
    <figure>
      <img className="h-auto max-w-full rounded-lg" src={src} alt={alt} />;
      <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">{alt}</figcaption>
    </figure>
  );
};
