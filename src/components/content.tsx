import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Link } from './link';
import { Paragraph } from './paragraph';
import { Code } from './code';

export const Content: React.FC<{ children: string }> = ({ children }) => {
    return (
        <Markdown
            components={{
                a({ node, ...props }) {
                    return <Link external {...props} />;
                },
                p({ node, ...props }) {
                    return <Paragraph {...props} />;
                },
                code(props) {
                    return <Code {...props} />;
                }
            }}
            rehypePlugins={[rehypeRaw]}
        >
            {children}
        </Markdown>
    );
};
