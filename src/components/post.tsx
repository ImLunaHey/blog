import { PropsWithChildren } from "react";
import Markdown from "react-markdown";
import rehypeRaw from 'rehype-raw';

const Title: React.FC<PropsWithChildren> = ({ children }) => {
    return <h1 className="text-4xl font-extrabold text-white">{children}</h1>;
};

const Link: React.FC<PropsWithChildren<{ href?: string; colour?: 'red' | 'indigo' | 'green' }>> = ({ href, children, colour = 'indigo' }) => {
    return <a href={href} className={`font-semibold text-gray-900 underline dark:text-white decoration-${colour}-500`}>{children}</a>
};

const Paragraph: React.FC<PropsWithChildren> = ({ children }) => {
    return <p className="text-gray-500 dark:text-gray-400">{children}</p>;
};

const Content: React.FC<{ children: string; }> = ({ children }) => {
    return <Markdown
        components={{
            a({ node, ...props }) {
                return <Link {...props} />
            },
            p({ node, ...props }) {
                return <Paragraph {...props} />
            }
        }}
        rehypePlugins={[rehypeRaw]}
    >{children}</Markdown>;
};

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
