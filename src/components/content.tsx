import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Link } from './link';
import { Text } from './text';
import { Code } from './code';
import { Title } from './title';

export const Content: React.FC<{ children: string }> = ({ children }) => {
  return (
    <Markdown
      components={{
        a({ node, ...props }) {
          return <Link external {...props} />;
        },
        p({ node, ...props }) {
          return <Text {...props} />;
        },
        code(props) {
          return <Code {...props} />;
        },
        h1({ node, ...props }) {
          return <Title size={1} {...props} />;
        },
        h2({ node, ...props }) {
          return <Title size={2} {...props} />;
        },
        h3({ node, ...props }) {
          return <Title size={3} {...props} />;
        },
        h4({ node, ...props }) {
          return <Title size={4} {...props} />;
        },
        h5({ node, ...props }) {
          return <Title size={5} {...props} />;
        },
        h6({ node, ...props }) {
          return <Title size={6} {...props} />;
        },
      }}
      rehypePlugins={[rehypeRaw]}
    >
      {children}
    </Markdown>
  );
};
