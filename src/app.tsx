import React, { PropsWithChildren } from 'react';
import { Application } from 'xirelta';
import { Home } from './components/home';
import { posts } from './posts';
import { Post } from './components/post';
import { NotFound } from './not-found';
import { logger } from './logger';
import { blog } from './config';
import { Text } from './components/text';
import { Title } from './components/title';
import { Link } from './components/link';
import { Author } from './components/author';
import { resolve } from 'path';

const blogFirstPostDate =
  Object.values(posts).length > 0
    ? Object.values(posts).sort((a, b) => {
      return a.publishedDate > b.publishedDate ? 1 : -1;
    })[0].publishedDate
    : null;

const startYear = blogFirstPostDate ? new Date(blogFirstPostDate).getFullYear() : null;

const App: React.FC<PropsWithChildren> = ({ children }) => (
  <html lang={blog.language}>
    <head>
      <title>{blog.title}</title>
      <meta name="description" content={blog.description} />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="view-transition" content="same-origin" />
      <script src="https://cdn.tailwindcss.com" />
      <style>{`
        p + p {
          margin-top:10px;
        }
      `}</style>
    </head>
    <body className="h-full w-full bg-[#0e0c15]">
      <header
        className="sm:w-4/6 w-5/6 container mx-auto mb-5"
        style={{
          viewTransitionName: 'main',
        }}
      >
        <Link href="/">
          <Title>{blog.title}</Title>
        </Link>
      </header>

      <main className="sm:w-4/6 w-5/6 container mx-auto mb-5">{children}</main>

      <footer className="sm:w-4/6 w-5/6 container mx-auto mb-5">
        <Text>
          &copy; {blogFirstPostDate && startYear !== new Date().getFullYear() && startYear + ' - '}{' '}
          {new Date().getFullYear()} {blog.title}
        </Text>
        <img
          style={{
            display: 'none',
          }}
          src="https://v.fish.lgbt/pixel.gif?id=blog.fish.lgbt"
        />
      </footer>
    </body>
    <script src="https://fish.lgbt/assets/js/htmx.org@1.9.4.min.js"></script>
  </html>
);

export const app = new Application({
  logger,
});

app.get('/', () => (
  <App>
    <Home />
  </App>
));

app.get('/robots.txt', () => {
  return new Response(`
    User-agent: *
    Allow /
  `, {
    headers: {
      'content-type': 'text/plain',
    },
  });
});

app.get('/posts/:slug', async ({ params: { slug } }) => {
  const post = posts[slug];
  if (!post)
    return (
      <App>
        <NotFound />
      </App>
    );
  return (
    <App>
      <Post {...post} />
    </App>
  );
});

app.get('/authors/:author', async ({ params: { author } }) => {
  return (
    <App>
      <Author author={author} />
    </App>
  );
});

app.get('/assets/:type/:fileName', async ({ params: { type, fileName } }) => {
  const filePath = resolve(`assets/images/${fileName}`);
  if (!filePath.startsWith(resolve(import.meta.dir, '..')) || type !== 'images')
    return (
      <App>
        <NotFound />
      </App>
    );

  return new Response(Bun.file(filePath));
});
