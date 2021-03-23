import { NextPage } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import { DownloadButton } from "@/components/DownloadButton";
import { RowOfSpreadSheet } from "@/models/RowOfSpreadSheet";
import { arrayData } from "@/lib/formatted_to_array";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

type Props = {
  filteredData: RowOfSpreadSheet[];
  headers: string[];
};

const ShowFilteredData: NextPage<Props> = ({
  filteredData = [],
  headers = [""],
}) => {
  // TODO: データバインドが上手くいっていないので直す
  // 表示するデータ
  const [shownData, setShownData] = useState<RowOfSpreadSheet[]>([]);

  /*
  //// TEST
  // ダウンロード用のデータ
  const [dlData, setDlData] = useState<string[][]>([[]]);
  */

  // ユーザの入力によってデータが変わった時に入れ直し
  useEffect(() => {
    setShownData(filteredData);
  }, [filteredData]);

  /*
  //// TEST
  // データを設定し直し
  useEffect(() => {
    setDlData(arrayData(headers, shownData));
  }, [shownData]);
  useEffect(() => {
    console.log(dlData);
  }, [dlData]);
  */

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
      if (!row.data[header]) {
        return <td></td>;
      } else if (row.data[header].length <= 25) {
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
          <Button variant="danger" onClick={() => deleteRow(index)}>
            削除
          </Button>
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
        <td>
          <DownloadButton
            fileName="spread-sheet"
            data={arrayData(headers, shownData)}
          />
        </td>
        {headerForTable}
      </tr>
      {shownRows}
    </>
  );
};

export default ShowFilteredData;
