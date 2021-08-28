import Head from "next/head";
import css from "./index.module.scss";

interface SiteLayoutProps {
  children: React.ReactNode;
}

function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className={css.siteContainer}>
      <Head>
        <title>Tile Extruder</title>
        <meta name="description" content="Web app to extrude tilesets." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  );
}

export default SiteLayout;
export type { SiteLayoutProps };
