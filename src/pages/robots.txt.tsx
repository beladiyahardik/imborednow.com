import type { GetServerSideProps } from "next";
import { SITE_URL } from "@/lib/site";

const CONTENT = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /bored-ai
Disallow: /p/random-activity

Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/blog-sitemap.xml`;

function RobotsTxt() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/plain");
  res.write(CONTENT);
  res.end();

  return { props: {} };
};

export default RobotsTxt;
