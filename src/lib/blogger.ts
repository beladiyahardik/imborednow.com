type BloggerPost = {
  id: string;
  title: string;
  content: string;
  published: string;
  updated: string;
  author?: {
    displayName?: string;
    url?: string;
    image?: { url?: string };
  };
  labels?: string[];
};

type BloggerPostsResponse = {
  items?: BloggerPost[];
  nextPageToken?: string;
  error?: unknown;
};

const BLOGGER_API_BASE = "https://www.googleapis.com/blogger/v3";

function getBloggerEnv() {
  const apiKey = process.env.BLOGGER_API_KEY;
  const blogId = process.env.BLOGGER_BLOG_ID;

  if (!apiKey || !blogId) {
    throw new Error("Missing BLOGGER_API_KEY or BLOGGER_BLOG_ID environment variables.");
  }

  return { apiKey, blogId };
}

export async function fetchBloggerPostsPage(options?: {
  maxResults?: number;
  pageToken?: string;
}) {
  const { maxResults = 100, pageToken } = options || {};
  const { apiKey, blogId } = getBloggerEnv();

  const url = new URL(`${BLOGGER_API_BASE}/blogs/${blogId}/posts`);
  url.searchParams.set("key", apiKey);
  url.searchParams.set("maxResults", String(maxResults));
  if (pageToken) url.searchParams.set("pageToken", pageToken);

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Blogger API page fetch failed: ${res.status}`);
  }

  return (await res.json()) as BloggerPostsResponse;
}

export async function fetchAllBloggerPosts(options?: {
  pageSize?: number;
  maxPages?: number;
}) {
  const pageSize = options?.pageSize ?? 100;
  const maxPages = options?.maxPages ?? 20;
  const all: BloggerPost[] = [];
  let token: string | undefined;

  for (let i = 0; i < maxPages; i++) {
    const data = await fetchBloggerPostsPage({
      maxResults: pageSize,
      pageToken: token,
    });

    if (data.items?.length) {
      all.push(...data.items);
    }

    if (!data.nextPageToken) break;
    token = data.nextPageToken;
  }

  return all;
}

export async function fetchBloggerPostById(id: string) {
  const { apiKey, blogId } = getBloggerEnv();

  const url = `${BLOGGER_API_BASE}/blogs/${blogId}/posts/${id}?key=${apiKey}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Blogger API post fetch failed: ${res.status}`);
  }

  return (await res.json()) as BloggerPost & { error?: unknown };
}

