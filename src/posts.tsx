import { read } from 'gray-matter';
import { readdir } from 'fs/promises';
import { PostProps } from './components/post';
import { logger } from './logger';

const files = await readdir('./posts');
logger.debug(`Loading posts`, {
    count: files.length,
});

export const posts = Object.fromEntries(
    files
        .map((path) => {
            const { data, content } = read(`./posts/${path}`);
            logger.debug('Loaded post', { path, slug: data.slug });
            return { data, content };
        })
        // Remove posts that dont currently have a slug
        // This is because we can't link to them at all
        .filter(({ data }) => !!data.slug)
        .map(({ data, content }) => {
            return [data.slug, {
                ...data,
                createdDate: new Date(data.created_date),
                publishedDate: new Date(data.published_date),
                modifiedDate: new Date(data.modified_date),
                content,
            }];
        })
) as Record<string, PostProps>;

logger.debug(`Loaded posts`, {
    count: Object.keys(posts).length,
});
