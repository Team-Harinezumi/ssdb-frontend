import { NextPage } from "next";

export type RowOfSpreadSheet = {
  data: {
    [header: string]: string;
  };
  options: {
    shown: boolean;
  };
};

type props = {
  filteredData: RowOfSpreadSheet[];
  headers: string[];
};

const ShowFilteredData: NextPage<props> = ({
  filteredData = [],
  headers = [""],
}) => {
  // 表示する表のヘッダー用のjsxを生成
  const headerForTable = headers.map((header) => <td>{header}</td>);

  // スプレッドシートの列を表示するjsxを生成
  const singleRow = (row: RowOfSpreadSheet) =>
    headers.map((header) => {
      return <td>{row.data[header]}</td>;
    });

  // row.options.shownがtrueである行を表にしてまとめて表示
  const shownRows = filteredData.map((row) => {
    return row.options.shown ? <tr>{singleRow(row)}</tr> : <></>;
  });

  return (
    <>
      <tr>{headerForTable}</tr>
      {shownRows}
    </>
  );
};

export default ShowFilteredData;
