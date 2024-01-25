import { HTMLAttributes } from 'react';

type ImageProps = HTMLAttributes<HTMLImageElement> & { src: string; alt?: string; lazy?: boolean };

export const Image = ({ src, alt, lazy = false }: ImageProps) => {
  const image = (
    <img loading={lazy ? 'lazy' : 'eager'} className="max-h-[250px] w-fit rounded-lg object-contain" src={src} alt={alt} />
  );
  if (!alt) {
    return image;
  }

  return (
    <figure>
      <a href={src} target="_blank">
        {image}
      </a>
      <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">{alt}</figcaption>
    </figure>
  );
};
