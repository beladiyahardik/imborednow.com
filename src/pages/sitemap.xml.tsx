import type { GetServerSideProps } from "next";
import { fetchAllBloggerPosts } from "@/lib/blogger";
import { SITE_URL } from "@/lib/site";

type BloggerPost = {
  id: string;
  title: string;
  updated?: string;
};

const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");

const staticRoutes = [
  "/",
  "/articles",
  "/p/tools",
  "/p/games-to-play-when-bored",
  "/info/about",
  "/info/contact",
  "/info/privacy-policy",
  "/info/terms",
  "/info/disclaimer",
];

function urlEntry(path: string, changefreq: string, priority: string, lastmod?: string) {
  return `<url>
  <loc>${SITE_URL}${path}</loc>
  ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
  <changefreq>${changefreq}</changefreq>
  <priority>${priority}</priority>
</url>`;
}

function buildSitemap(posts: BloggerPost[]) {
  const staticEntries = staticRoutes
    .map((route) => urlEntry(route, "weekly", route === "/" ? "1.0" : "0.8"))
    .join("");

  const articleEntries = posts
    .map((post) => {
      const slug = `${slugify(post.title)}-${post.id}`;
      const lastmod = post.updated ? new Date(post.updated).toISOString() : undefined;
      return urlEntry(`/articles/${slug}`, "weekly", "0.7", lastmod);
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${articleEntries}
</urlset>`;
}

function SitemapXml() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    const posts = await fetchAllBloggerPosts({ pageSize: 100, maxPages: 30 });
    const xml = buildSitemap(posts || []);
    res.setHeader("Content-Type", "text/xml");
    res.write(xml);
    res.end();
  } catch {
    res.statusCode = 500;
    res.end();
  }

  return { props: {} };
};

export default SitemapXml;
