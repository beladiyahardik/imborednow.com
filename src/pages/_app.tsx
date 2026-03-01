import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SEO_DEFAULTS, SITE_NAME, absoluteUrl, shouldNoIndex } from "@/lib/site";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Mulish } from "next/font/google";
import { useRouter } from "next/router";
import Head from "next/head";
import { generateDefaultSeo } from "next-seo/pages";

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const currentPath = router.asPath.split("?")[0].split("#")[0] || "/";
  const noindex = shouldNoIndex(currentPath);

  return (
    <div className={`${mulish.variable} site-shell`}>
      <Head>
        {generateDefaultSeo({
          titleTemplate: `%s | ${SITE_NAME}`,
          defaultTitle: SEO_DEFAULTS.title,
          description: SEO_DEFAULTS.description,
          canonical: absoluteUrl(currentPath),
          noindex,
          nofollow: noindex,
          openGraph: {
            type: "website",
            locale: "en_US",
            siteName: SITE_NAME,
            url: absoluteUrl(currentPath),
            title: SEO_DEFAULTS.title,
            description: SEO_DEFAULTS.description,
          },
          twitter: {
            cardType: "summary_large_image",
          },
          additionalMetaTags: [
            { name: "author", content: SITE_NAME },
            {
              name: "robots",
              content: noindex
                ? "noindex, nofollow"
                : "index, follow, max-image-preview:large",
            },
          ],
        })}
      </Head>
      <Header />
      <main className="site-main pt-16">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
