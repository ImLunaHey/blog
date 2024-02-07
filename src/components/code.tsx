import { ReactNode } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type CodeProps = {
  children?: ReactNode;
  className?: string;
  node?: Element | undefined;
};

export const Code = ({ children, className, node, ...rest }: CodeProps) => {
  const match = /language-(\w+)/.exec(className || '');
  return match ? (
    <SyntaxHighlighter
      {...rest}
      children={String(children).replace(/\n$/, '')}
      style={oneDark}
      language={match[1]}
      PreTag="div"
    />
  ) : (
    <code {...rest} className={className}>
      {children}
    </code>
  );
};
