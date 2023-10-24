import { PropsWithChildren } from 'react';

type LinkProps = PropsWithChildren<{ href?: string; external?: boolean; underline?: boolean }>;

export const Link: React.FC<LinkProps> = ({ href, children, external = false, underline = true, ...passthrough }) => {
  // Links to outside websites
  if (external)
    return (
      <a
        href={href}
        title="This link will take you to an external website."
        className={`font-semibold text-gray-900 ${
          underline && 'underline'
        } dark:text-white decoration-pink-500 after:content-['_↗']`}
        target="_blank"
        {...passthrough}
      >
        {children}
      </a>
    );

  // Internal links
  return (
    <a
      href={href}
      hx-get={href}
      hx-push-url="true"
      hx-swap="innerHTML transition:true"
      hx-target="body"
      className={`font-semibold text-gray-900 ${underline && 'underline'} dark:text-white decoration-indigo-500`}
      {...passthrough}
    >
      {children}
    </a>
  );
};
