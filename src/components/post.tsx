import { Title } from "./title";
import { Content } from "./content";
import { Paragraph } from "./paragraph";
import { blog } from "../config";

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
};

export const Post: React.FC<PostProps> = (post) => {
    return <>
        <main className="h-full w-full" style={{
            viewTransitionName: 'main',
        }}>
            <article className="container mx-auto">
                <Title size={3}>{post.title}</Title>
                <Paragraph>{new Date(post.publishedDate).toLocaleDateString(blog.language, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}</Paragraph>
                <Content>{post.content}</Content>
            </article>
        </main>
    </>;
};
