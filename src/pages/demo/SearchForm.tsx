import { NextPage } from "next";
import { useState } from "react";
import FilteringBox from "./FilteringBox";

const SearchForm: NextPage = () => {
  const [spreadSheetUrl, setUrl] = useState(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSDSvWQNtJMW5IUsLF6FP12PNt8nSqaqw554UiNnUEYAZlWSp7PU509-M2IJ96D72gpCJznDvyied57/pubhtml"
  );

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUrl(event.target.value as string);
  };

  const handleSubmit = () => {
    // TODO: スプレッドシート取得のAPI起動
    console.log("search on", spreadSheetUrl);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="URLを入力してください"
          value={spreadSheetUrl}
          onChange={handleChange}
        />
        <input type="submit" value="検索" />
      </form>
      <FilteringBox url={spreadSheetUrl} />
    </>
  );
};

export default SearchForm;
