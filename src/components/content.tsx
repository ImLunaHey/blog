import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Link } from './link';
import { Text } from './text';
import { Code } from './code';
import { Title } from './title';
import { Image } from './image';

type ContentProps = {
  children: string;
};

export const Content = ({ children }: ContentProps) => {
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
              {/* Hyphen mark */}
              <svg
                className="w-[20px] h-[20px] min-w-[20px] min-h-[20px] text-gray-400 dark:text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.5 7.5a1 1 0 011-1h11a1 1 0 110 2h-11a1 1 0 01-1-1zm0 5a1 1 0 011-1h11a1 1 0 110 2h-11a1 1 0 01-1-1z"
                />
              </svg>
              <Text inline {...props} />
            </li>
          );
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
        img({ node, ...props }) {
          // @ts-expect-error
          return <Image {...props} />;
        },
        hgroup({ node, children, ...props }) {
          return (
            <div className="flex flex-row gap-2" {...props}>
              <Content>{children as string}</Content>
            </div>
          );
        },
      }}
      rehypePlugins={[rehypeRaw]}
    >
      {children}
    </Markdown>
  );
};
