import { NextPage } from "next";
import { useState } from "react";
import FilteringBox from "./FilteringBox";
import { fetchGss } from "../../api/fetch_gss";

const SearchForm: NextPage = () => {
  // ユーザの入力とバインド
  const [inputUrl, setInputUrl] = useState(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSDSvWQNtJMW5IUsLF6FP12PNt8nSqaqw554UiNnUEYAZlWSp7PU509-M2IJ96D72gpCJznDvyied57/pubhtml"
  );
  // SSの整形前のデータ
  const [sheet, setSheet] = useState<string[][]>([[""], [""]]);

  // ユーザの入力を取得
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setInputUrl(event.target.value as string);
  };

  // 検索ボタンを押すと入力したURLからSSが呼ばれ、シートを取得(未整形)
  const handleSearch = () => {
    const gss = async () => {
      const fetchedGss = await fetchGss(inputUrl);
      setSheet(fetchedGss as string[][]);
    };
    gss();
  };

  return (
    <>
      <input
        type="text"
        placeholder="URLを入力してください"
        value={inputUrl}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>検索</button>
      <FilteringBox rawData={sheet} />
    </>
  );
};

export default SearchForm;
