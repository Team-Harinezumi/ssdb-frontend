import { NextPage } from "next";
import { useRouter } from "next/router";
import SearchForm from "@/components/SearchForm";
import Head from "next/head";

const Search: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>SSDB</title>
        <meta name="description" content="パブリックなスプレッドシートに対して、絞り込みや絞り込み結果のダウンロードを行えます" />
      </Head>
      <SearchForm
        defaultUrl={router.query.url as string}
        defaultHeaderIndex={Number(router.query.index)}
        fixed={Number(router.query.fixed)}
      />
    </>
  );
};

export default Search;
