import { NextPage } from "next";
import MagicSpreadSheet from "@/components/MagicSpreadSheet";
import Head from "next/head";

const Engineer: NextPage = () => (
  <>
    <Head>
      <title>SSDB | エンジニア魔法のスプレッドシート</title>
      <meta name="description" content="エンジニアインターンを掲載した魔法のスプレッドシートに対して、絞り込みや絞り込み結果のダウンロードを行えます" />
    </Head>
    <MagicSpreadSheet type={"engineer"} />
  </>
)

export default Engineer;
