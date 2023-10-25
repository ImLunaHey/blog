import { Title } from './title';
import { Content } from './content';
import { PostDate } from './post-date';
import { AuthorBadge } from './author-badge';
import { Text } from './text';

export type PostProps = {
  title: string;
  slug: string;
  description: string;
  createdDate: Date;
  publishedDate: Date;
  modifiedDate: Date;
  draft: boolean;
  tags: string[];
  categories: string[];
  content: string;
  authors: string[];
  preview?: string;
};

export const Post: React.FC<PostProps> = (post) => {
  return (
    <>
      <head>
        <meta property="og:image" content={post.preview} />
      </head>
      <div
        className="h-full w-full"
        style={{
          viewTransitionName: 'main',
        }}
      >
        <article className="container mx-auto">
          <Title size={3}>{post.title}</Title>
          <div>
            <PostDate date={post.publishedDate} />
            <Text inline>{' - '}</Text>
            {post.authors.map((author) => (
              <AuthorBadge key={author} author={author} />
            ))}
          </div>
          <Content>{post.content}</Content>
        </article>
      </div>
    </>
  );
};
