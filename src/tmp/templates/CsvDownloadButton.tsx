import { NextPage } from "next";

const CsvDownloadButton: NextPage = () => {
  const downloadCsv = () => {
    // TODO: 表をCSV形式でダウンロード
    console.log("clicked");
  };

  return <button onClick={downloadCsv}>ダウンロード</button>;
};

export default CsvDownloadButton;
