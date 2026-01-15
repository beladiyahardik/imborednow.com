import { GetServerSideProps } from 'next';

const API_KEY = "AIzaSyDw4oUW9oN8DfN5u6CUgFJ5rE7CF512l_0";
const BLOG_ID = "9008125657659692221";
const EXTERNAL_DATA_URL = 'https://www.imborednow.com/articles';

// --- Utilities ---
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w-]+/g, '')       // Remove all non-word chars
    .replace(/--+/g, '-')           // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

function generateSiteMap(posts: any[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://www.imborednow.com</loc>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>https://www.imborednow.com/articles</loc>
       <changefreq>daily</changefreq>
       <priority>0.8</priority>
     </url>
     ${posts
       .map((post) => {
         // Generate the same slug format used in your [url].tsx and BlogList.tsx
         const slug = slugify(post.title);
         const fullSlugUrl = `${slug}-${post.id}`;
         
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${fullSlugUrl}`}</loc>
           <lastmod>${new Date(post.updated).toISOString()}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>0.6</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps handles the XML response
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    const request = await fetch(
      `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=100`
    );
    const data = await request.json();
    const posts = data.items || [];

    const sitemap = generateSiteMap(posts);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error("Sitemap error:", error);
    res.statusCode = 500;
    res.end();
  }

  return {
    props: {},
  };
};

export default SiteMap;