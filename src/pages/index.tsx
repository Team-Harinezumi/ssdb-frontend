import { NextPage } from "next";
import TopPage from "@/components/TopPage";
import Head from "next/head";

const IndexPage: NextPage = () => (
  <>
    <Head>
      <title>SpreadSheet-DB</title>
      <meta name="description" content="パブリックなGoogle Spread Sheetに対して絞り込み検索を行ったり、絞り込んだ結果をダウンロードすることができます" />
    </Head>
    <TopPage />
  </>
);

export default IndexPage;
