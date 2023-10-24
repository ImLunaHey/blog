import { posts } from '../posts';
import { Link } from './link';
import { Text } from './text';
import { PostDate } from './post-date';
import { Title } from './title';

const articles = Object.values(posts)
  .filter((post) => !post.draft)
  .sort((a, b) => {
    return a.publishedDate > b.publishedDate ? -1 : 1;
  })
  .map((post) => (
    <article className="container mx-auto" key={post.slug}>
      <Link href={`/posts/${post.slug}`}>
        <Title size={5}>{post.title}</Title>
      </Link>
      <PostDate date={post.publishedDate} />
    </article>
  ));

export const Home = () => {
  return <>{articles.length > 0 ? articles : <Text>No posts yet.</Text>}</>;
};
