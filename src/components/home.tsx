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
    .map(post => <article className="w-4/6 container mx-auto">
        <Link><Title size={5}>{post.title}</Title></Link>
    </article>);

const blogFirstPostDate = Object.values(posts).length > 0 ? Object.values(posts).sort((a, b) => {
    return a.publishedDate > b.publishedDate ? 1 : -1;
})[0].publishedDate : null;

const startYear = blogFirstPostDate ? new Date(blogFirstPostDate).getFullYear() : null;

export const Home = () => {
    return <div className="h-full w-full bg-[#111827]">
        <header className="w-4/6 container mx-auto mb-5">
            <Title>{blog.title}</Title>
        </header>

        <main className="w-4/6 container mx-auto mb-5">
            {articles.length > 0 ? articles : <Paragraph>No posts yet.</Paragraph>}
        </main>

        <footer className="w-4/6 container mx-auto mb-5">
            <Paragraph>&copy; {(blogFirstPostDate && startYear !== new Date().getFullYear()) && startYear + ' - '} {new Date().getFullYear()} {blog.title}</Paragraph>
        </footer>
    </div>;
};
