import { NextPage } from "next";
import { useRouter } from "next/router";
import SearchForm from "@/components/SearchForm";

const Search: NextPage = () => {
  const router = useRouter();
  return (
    <SearchForm
      defaultUrl={router.query.url as string}
      defaultHeaderIndex={Number(router.query.index)}
      fixed={Number(router.query.fixed)}
    />
  );
};

export default Search;
