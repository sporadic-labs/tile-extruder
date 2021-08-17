import Head from "next/head";
import css from "./index.module.scss";

interface SiteLayoutProps {
  children: React.ReactNode;
}

function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className={css.siteContainer}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Web app to extrude tilesets." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>🧭</nav>
      <div className={css.container}>{children}</div>
      <footer>©</footer>
    </div>
  );
}

export default SiteLayout;
export type { SiteLayoutProps };
