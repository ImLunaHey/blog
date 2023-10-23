import React, { PropsWithChildren } from 'react';
import { Application } from 'xirelta';
import { Home } from './components/home';
import { posts } from './posts';
import { Post } from './components/post';
import { NotFound } from './not-found';
import { logger } from './logger';

const App: React.FC<PropsWithChildren> = ({ children }) => <html>
    <head>
        <title>My Blog</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com" />
    </head>
    <body>
        {children}
    </body>
</html>;

export const app = new Application({
    logger,
});

app.get('/', () => <App><Home /></App>);
app.get('/posts/:slug', async ({ params: { slug } }) => {
    const post = posts[slug];
    if (!post) return <App><NotFound /></App>;
    return <App><Post {...post} /></App>;
});
