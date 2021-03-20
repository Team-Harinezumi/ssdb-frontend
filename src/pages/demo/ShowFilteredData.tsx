import { NextPage } from "next";
import { useState, useEffect } from "react";

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
  const [shownData, setShownData] = useState<RowOfSpreadSheet[]>(filteredData);

  // ユーザの入力によってデータが変わった時に入れ直し
  useEffect(() => {
    setShownData(filteredData);
  }, [filteredData]);

  // 表示する表のヘッダー用のjsxを生成
  const headerForTable = headers.map((header) => <td>{header}</td>);

  // スプレッドシートの列を表示するjsxを生成
  const singleRow = (row: RowOfSpreadSheet) =>
    headers.map((header) => {
      return <td>{row.data[header]}</td>;
    });

  // 削除ボタンが押された時に変更
  const deleteRow = (index: number) => {
    let tmp = require("rfdc")()(shownData) as RowOfSpreadSheet[];
    tmp[index].options.shown = false;
    setShownData(tmp);
  };

  // row.options.shownがtrueである行を表にしてまとめて表示
  const shownRows = shownData.map((row, index) => {
    return row.options.shown ? (
      <tr>
        <td>
          <button onClick={() => deleteRow(index)}>削除</button>
        </td>
        {singleRow(row)}
      </tr>
    ) : (
      <></>
    );
  });

  return (
    <>
      <tr>
        <td></td>
        {headerForTable}
      </tr>
      {shownRows}
    </>
  );
};

export default ShowFilteredData;
