import { NextPage } from "next";
import { fetchGss } from "../../api/fetch_gss";
import { useState, useEffect } from "react";
import { filteredData } from "../../lib/filter_row";

const url =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSDSvWQNtJMW5IUsLF6FP12PNt8nSqaqw554UiNnUEYAZlWSp7PU509-M2IJ96D72gpCJznDvyied57/pubhtml";

export type RowOfSpreadSheet = {
  data: {
    [header: string]: string;
  };
  options: {
    shown: boolean;
  };
};

type Props = {
  rawData: string[][];
};

const SpreadSheetTable: NextPage<Props> = ({ rawData = [] }) => {
  // 生のデータ(string[][])をRowOfSpreadSheet[]に整形
  rawData.shift(); // FOR TEST: 魔法のスプレッドシートは2行目から情報がはじまるため、テスト用に暫定的にこれで
  const headers = rawData[0];
  rawData.shift();

  const formattedData = rawData.map((row) => {
    let formattedRow: RowOfSpreadSheet = {
      data: {},
      options: {
        shown: true,
      },
    };
    headers.forEach(
      (header, index) => (formattedRow.data[header] = row[index])
    );

    return formattedRow;
  });

  // 表示する表のヘッダー用のjsxを生成
  const headerForTable = headers.map((header) => <td>{header}</td>);

  // スプレッドシートの列を表示するjsxを生成
  const singleRow = (row: RowOfSpreadSheet) =>
    headers.map((header) => {
      return <td>{row.data[header]}</td>;
    });

  // row.options.shownがtrueである行を表にしてまとめて表示
  const shownRows = formattedData.map((row) => {
    return row.options.shown ? <tr>{singleRow(row)}</tr> : <></>;
  });

  /*
  // filteredDataのテスト
  const shownRows = filteredData("会社(A→Z)", "Amazon", formattedData).map(
    (row) => {
      return row.options.shown ? <tr>{singleRow(row)}</tr> : <></>;
    }
  );
  */

  return (
    <>
      <table>
        <tbody>
          <tr>{headerForTable}</tr>
          {shownRows}
        </tbody>
      </table>
    </>
  );
};

const EnhancedSpreadSheetTable: NextPage = () => {
  // sheetの初期値を[]にするとuseEffect前のレンダリングでheadersがundefinedになってバグる
  const [sheet, setSheet] = useState<string[][]>([["hoge"], [""]]);
  useEffect(() => {
    const gss = async () => {
      const fetchedGss = await fetchGss(url);
      setSheet(fetchedGss as string[][]);
    };
    gss();
  }, []);

  return <SpreadSheetTable rawData={sheet} />;
};

export default EnhancedSpreadSheetTable;
