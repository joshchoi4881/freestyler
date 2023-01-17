import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta key="title" property="og:title" content="freestyler" />
        <meta
          key="description"
          property="og:description"
          content="generate a freestyle rap from your favorite rapper"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
