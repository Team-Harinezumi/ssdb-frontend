import { NextPage } from "next";
import MagicSpreadSheet from "@/components/MagicSpreadSheet";
import Head from "next/head";

const Business: NextPage = () => (
  <>
    <Head>
      <title>SSDB | ビジネス魔法のスプレッドシート</title>
      <meta name="description" content="ビジネスインターンを掲載した魔法のスプレッドシートに対して、絞り込みや絞り込み結果のダウンロードを行えます" />
    </Head>
    <MagicSpreadSheet type={"business"} />
  </>
)

export default Business;
