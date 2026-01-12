import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7085320120847108"
          strategy="beforeInteractive"
          crossOrigin="anonymous"
        />

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-7Z56ZLVNVC"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-7Z56ZLVNVC', {
                    page_path: window.location.pathname,
                  });
                `,
          }}
        />

        <meta
          name="google-adsense-account"
          content="ca-pub-7085320120847108"
        ></meta>

        <link rel="icon" href="/favicon.ico" sizes="any"></link>
        
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
