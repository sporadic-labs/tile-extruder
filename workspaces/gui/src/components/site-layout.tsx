import Head from "next/head";

interface SiteLayoutProps {
  children: React.ReactNode;
}

function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Web app to extrude tilesets." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>🧭</nav>
      {children}
      <footer>©</footer>
    </>
  );
}

export default SiteLayout;
export type { SiteLayoutProps };
