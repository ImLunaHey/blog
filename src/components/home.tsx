import { posts } from "../posts";

export const Home = () => <div>
    <h1 className="text-3xl font-bold underline text-clifford">
        My blog
    </h1>
    <ul>
        {Object.values(posts).map((post) => <li>
            <a href={`/posts/${post.slug}`}>{post.title}</a>
        </li>)}
    </ul>
</div>;
