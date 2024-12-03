import { BskyAgent } from '@atproto/api';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import type { BlogEntry } from '../types/blog-entry';

const agent = new BskyAgent({
  service: 'https://bsky.social',
});

const useBlogEntries = (did: string) => {
  const query = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await agent.com.atproto.repo.listRecords({
        repo: did,
        collection: 'com.whtwnd.blog.entry',
      });
      return (response.data.records as BlogEntry[])
        .toSorted((a, b) => b.value.createdAt.localeCompare(a.value.createdAt))
        .filter((entry) => entry.value.visibility === 'public');
    },
  });

  return query;
};

const PostEntries = () => {
  const { data, isLoading, isError, error } = useBlogEntries('did:plc:k6acu4chiwkixvdedcmdgmal');

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{error.message}</p>;

  return (
    <>
      <h1>Posts</h1>
      <ul>
        {data?.map((entry) => (
          <li key={entry.uri}>
            <h2>
              <a href={`/post/${entry.uri.split('/').pop()}`}>{entry.value.title}</a>
            </h2>
          </li>
        ))}
      </ul>
    </>
  );
};

const queryClient = new QueryClient();

export const PostList = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PostEntries />
    </QueryClientProvider>
  );
};
