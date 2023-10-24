import { ReactNode } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const Code: React.FC<{
    children?: ReactNode;
    className?: string;
    node?: Element | undefined;
}> = ({ children, className, node, ...rest }) => {
    const match = /language-(\w+)/.exec(className || '')
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
    )
};
