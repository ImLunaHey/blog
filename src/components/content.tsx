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
        li({ node, ...props }) {
          return (
            <li className="flex items-center space-x-3">
              <svg
                className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
              <Text {...props} />
            </li>
          );
          // return <li className="text-gray-500 dark:text-gray-400" {...props} />;
        },
        strong({ node, ...props }) {
          return <strong className="font-bold text-black dark:text-white" {...props} />;
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
