import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps
} from "next/document";

class MyDocument extends Document<DocumentProps> {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <meta name="description" content="SpreadSheetDB" key="description" />
          <link rel="stylesheet" href="all.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;
