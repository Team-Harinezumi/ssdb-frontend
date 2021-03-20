import { NextPage } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import { RowOfSpreadSheet } from "@/models/RowOfSpreadSheet";

type Props = {
  filteredData: RowOfSpreadSheet[];
  headers: string[];
};

const ShowFilteredData: NextPage<Props> = ({
  filteredData = [],
  headers = [""],
}) => {
  const [shownData, setShownData] = useState<RowOfSpreadSheet[]>(filteredData);

  // ユーザの入力によってデータが変わった時に入れ直し
  useEffect(() => {
    setShownData(filteredData);
  }, [filteredData]);

  // 削除ボタンが押された時に変更
  const deleteRow = (index: number) => {
    let tmp = require("rfdc")()(shownData) as RowOfSpreadSheet[];
    tmp[index].options.shown = false;
    setShownData(tmp);
  };

  // 展開用のリンクが押された時に変更
  const switchFolded = (index: number) => {
    let tmp = require("rfdc")()(shownData) as RowOfSpreadSheet[];
    tmp[index].options.folded = !tmp[index].options.folded;
    setShownData(tmp);
  };

  // 表示する表のヘッダー用のjsxを生成
  const headerForTable = headers.map((header) => <td>{header}</td>);

  // スプレッドシートの列を表示するjsxを生成
  const singleRow = (row: RowOfSpreadSheet, index: number) =>
    headers.map((header) => {
      if (row.data[header].length <= 25) {
        return <td>{row.data[header]}</td>;
      } else if (row.options.folded) {
        return (
          <td>
            {row.data[header].slice(0, 25)}
            <Link href="#">
              <a onClick={() => switchFolded(index)}>...</a>
            </Link>
          </td>
        );
      }
      return (
        <td>
          {row.data[header]}
          <Link href="#">
            <a onClick={() => switchFolded(index)}>...</a>
          </Link>
        </td>
      );
    });

  // row.options.shownがtrueである行を表にしてまとめて表示
  const shownRows = shownData.map((row, index) => {
    return row.options.shown ? (
      <tr>
        <td>
          <button onClick={() => deleteRow(index)}>削除</button>
        </td>
        {singleRow(row, index)}
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
