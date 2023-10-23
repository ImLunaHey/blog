import { read } from 'gray-matter';
import { readdir } from 'fs/promises';
import { PostProps } from './components/post';

const files = await readdir('./posts');
console.info(`Loading posts`, {
    count: files.length,
});

export const posts = Object.fromEntries(files.map((path) => {
    const { data, content } = read(`./posts/${path}`);
    console.info(`Loaded post`, { path, slug: data.slug });
    return [data.slug, {
        ...data,
        createdDate: new Date(data.created_date),
        publishedDate: new Date(data.published_date),
        modifiedDate: new Date(data.modified_date),
        content,
    }];
})) as Record<string, PostProps>;

console.info(`Loaded posts`, {
    count: Object.keys(posts).length,
});
