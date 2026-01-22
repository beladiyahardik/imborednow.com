import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />
      <div className="pt-24 md:pt-32">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
