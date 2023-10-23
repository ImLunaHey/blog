import { Title } from "./title";
import { Content } from "./content";

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
        <main className="h-full w-full bg-[#111827]">
            <article className="w-4/6 container mx-auto">
                <Title>{post.title}</Title>
                <Content>{post.content}</Content>
            </article>
        </main>
    </>;
};
