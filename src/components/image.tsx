import { HTMLAttributes } from 'react';

export const Image: React.FC<HTMLAttributes<HTMLImageElement> & { src: string; alt?: string; lazy?: boolean }> = ({
  src,
  alt,
  lazy = false,
}) => {
  if (!alt) {
    return <img loading={lazy ? 'lazy' : 'eager'} className="h-auto max-w-full rounded-lg" src={src} />;
  }

  return (
    <figure>
      <img loading={lazy ? 'lazy' : 'eager'} className="h-auto max-w-full rounded-lg" src={src} alt={alt} />;
      <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">{alt}</figcaption>
    </figure>
  );
};
