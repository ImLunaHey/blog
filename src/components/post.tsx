import { BskyAgent } from '@atproto/api';
import type { ThreadViewPost } from '@atproto/api/dist/client/types/app/bsky/feed/defs';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import type { BlogEntry } from '../types/blog-entry';

const agent = new BskyAgent({
  service: 'https://bsky.social',
});

const useBlogEntry = (uri: string | null) => {
  const rkey = uri?.split('/').pop();
  const query = useQuery({
    queryKey: ['post', uri],
    queryFn: async () => {
      if (!uri || !rkey) return null;

      const response = await agent.com.atproto.repo.getRecord({
        repo: 'did:plc:k6acu4chiwkixvdedcmdgmal',
        collection: 'com.whtwnd.blog.entry',
        rkey,
      });

      return response.data as BlogEntry;
    },
  });

  return query;
};

const useBlogEntryComments = (uri: string | null | undefined) => {
  const query = useQuery({
    queryKey: ['post', uri],
    queryFn: async () => {
      if (!uri) return null;

      const response = (await fetch(
        'https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?' +
          new URLSearchParams({
            uri,
          }).toString(),
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
          cache: 'no-store',
        },
      ).then((res) => res.json())) as {
        thread: ThreadViewPost;
      };

      return response.thread.replies as ThreadViewPost[];
    },
  });

  return query;
};

const PostEntry = () => {
  const uri = new URLSearchParams(window.location.search).get('uri');
  const { data: post, isLoading: isLoadingPost, isError: isErrorPost, error: errorPost } = useBlogEntry(uri);
  const {
    data: comments,
    isLoading: isLoadingComments,
    isError: isErrorComments,
    error: errorComments,
  } = useBlogEntryComments(post?.value.comments);

  const isLoading = isLoadingPost || isLoadingComments;
  const isError = isErrorPost || isErrorComments;
  const error = errorPost || errorComments;

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{error?.message}</p>;

  if (!post) return <p>Post not found</p>;

  return (
    <>
      <h1>{post.value.title}</h1>
      <p>{post.value.content}</p>
      <h2>Comments</h2>
      <ul>
        {comments
          ?.map(
            (comment) =>
              comment as unknown as ThreadViewPost & {
                post: {
                  record: {
                    text: string;
                  };
                };
              },
          )
          ?.map((comment) => (
            <li key={comment.post.cid}>
              <p>
                <a href={`http://bsky.app/profile/${comment.post.author.did}`}>@{comment.post.author.handle}</a> said{' '}
                {comment.post.record.text}
              </p>
            </li>
          ))}
      </ul>
    </>
  );
};

const queryClient = new QueryClient();

export const Post = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PostEntry />
    </QueryClientProvider>
  );
};
