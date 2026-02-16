import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Mulish } from "next/font/google";

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={mulish.variable}>
      <Header />
      <div className="pt-24 md:pt-32">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
