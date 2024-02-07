import { HtmlHTMLAttributes } from 'react';

type TextProps = HtmlHTMLAttributes<HTMLParagraphElement> & { children: React.ReactNode; inline?: boolean };

export const Text = ({ children, inline = false, className = '', ...passthrough }: TextProps) => {
  if (inline)
    return (
      <span className={'text-gray-500 dark:text-gray-400 ' + className} {...passthrough}>
        {children}
      </span>
    );

  return (
    <p className={'text-gray-500 dark:text-gray-400 ' + className} {...passthrough}>
      {children}
    </p>
  );
};
