import { Link } from './link';
import { Text } from './text';

type AuthorBadgeProps = { author: string };

export const AuthorBadge = ({ author }: AuthorBadgeProps) => (
  <>
    <Text
      inline
      key={author}
      title={`This was written by ${author}`}
      className="inline-block bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300"
    >
      <Link key={author} underline={false} href={`/authors/${author}`} external>
        Written by {author === 'chatGPT' ? 'AI 🪄' : author}
      </Link>
    </Text>
  </>
);
