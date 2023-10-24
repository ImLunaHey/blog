import { blog } from "../config";
import { posts } from "../posts";
import { Link } from "./link";
import { Paragraph } from "./paragraph";
import { Title } from "./title";

const articles = Object.values(posts)
    .filter(post => !post.draft)
    .sort((a, b) => {
        return a.publishedDate > b.publishedDate ? -1 : 1;
    })
    .map(post => <article className="container mx-auto" key={post.slug}>
        <Link href={`/posts/${post.slug}`}><Title size={5}>{post.title}</Title></Link>
        <Paragraph>{new Date(post.publishedDate).toLocaleDateString(blog.language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })}</Paragraph>
    </article>);

export const Home = () => {
    return <>
        {articles.length > 0 ? articles : <Paragraph>No posts yet.</Paragraph>}
    </>
};
