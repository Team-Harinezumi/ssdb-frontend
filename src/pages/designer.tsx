import { NextPage } from "next";
import MagicSpreadSheet from "@/components/MagicSpreadSheet";
import Head from "next/head";

const Designer: NextPage = () => (
  <>
    <Head>
      <title>SSDB | デザイナー魔法のスプレッドシート</title>
      <meta name="description" content="デザイナーインターンを掲載した魔法のスプレッドシートに対して、絞り込みや絞り込み結果のダウンロードを行えます" />
    </Head>
    <MagicSpreadSheet type={"designer"} />
  </>
)

export default Designer;
