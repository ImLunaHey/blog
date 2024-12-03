export type BlogEntry = {
  uri: string;
  cid: string;
  value: {
    $type: 'com.whtwnd.blog.entry';
    theme: string;
    title: string;
    content: string;
    createdAt: string;
    visibility: 'public' | 'private';
    comments?: `at://did:plc:k6acu4chiwkixvdedcmdgmal/com.whtwnd.blog.entry/${string}`;
  };
};
