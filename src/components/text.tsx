import { HtmlHTMLAttributes, PropsWithChildren } from 'react';

export const Text: React.FC<PropsWithChildren<HtmlHTMLAttributes<HTMLParagraphElement> & { inline?: boolean }>> = ({
  children,
  inline = false,
  ...passthrough
}) => {
  if (inline)
    return (
      <span className="text-gray-500 dark:text-gray-400" {...passthrough}>
        {children}
      </span>
    );

  return (
    <p className="text-gray-500 dark:text-gray-400" {...passthrough}>
      {children}
    </p>
  );
};
