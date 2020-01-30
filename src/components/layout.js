import Head from "next/head";

export default ({ children }) => (
  <div>
    <Head>
      <title>The Bonus</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        href="https://fonts.googleapis.com/css?family=Barlow:400,800|Titillium+Web:600"
        rel="stylesheet"
      />
      <link href="/static/styles.css" rel="stylesheet" />
      <link rel="shortcut icon" href="/static/favicon.ico" />
    </Head>

    <header className="header">
      <img src="/static/images/logo.png" alt="" width="40" />

      <h1 className="header__title">
        The <strong className="header__frontmen">Frontmen</strong> Bonus{" "}
        <sup className="header__mvp">beta</sup>
      </h1>
    </header>

    <main>{children}</main>
  </div>
);
