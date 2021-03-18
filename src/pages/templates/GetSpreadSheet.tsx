import { NextPage } from "next";
import { useState } from "react";

const GetSpreadSheet: NextPage = () => {
  const [spreadSheetUrl, setUrl] = useState("");

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
    </>
  );
};

export default GetSpreadSheet;
