import { NextPage } from "next";
import { useState } from "react";
import FilteringBox from "@/components/FilteringBox";
import { fetchGss } from "@/api/fetch_gss";

const SearchForm: NextPage = () => {
  // ユーザの入力とバインド
  const [inputUrl, setInputUrl] = useState(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSDSvWQNtJMW5IUsLF6FP12PNt8nSqaqw554UiNnUEYAZlWSp7PU509-M2IJ96D72gpCJznDvyied57/pubhtml"
  );
  // ヘッダ行のインデックス
  const [headerIndex, setHeaderIndex] = useState(1);
  // SSの整形前のデータ
  const [sheet, setSheet] = useState<string[][]>([]);

  // ユーザの入力を取得
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setInputUrl(event.target.value as string);
  };
  // インデックスを1増やす
  const handleIncrement = () => {
    setHeaderIndex((headerIndex) => headerIndex + 1);
  };
  // インデックスを1減らす
  const handleDecrement = () => {
    if (headerIndex === 1) return;
    setHeaderIndex((headerIndex) => headerIndex - 1);
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
      ヘッダの開始行
      <button onClick={handleDecrement}>-</button>
      {headerIndex}
      <button onClick={handleIncrement}>+</button>
      <FilteringBox rawData={sheet} headerIndex={headerIndex} />
    </>
  );
};

export default SearchForm;
