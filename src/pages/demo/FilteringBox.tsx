import { NextPage } from "next";
import { useState, useEffect } from "react";
import ShowFilteredData from "./ShowFilteredData";
import { fetchGss } from "../../api/fetch_gss";
import type { RowOfSpreadSheet } from "./ShowFilteredData";

type props = {
  url: string;
};

const FilteringBox: NextPage<props> = ({ url = "" }) => {
  // データ取得のAPIを叩いてデータを取得 string[][]
  // sheetの初期値を[]にするとuseEffect前のレンダリングでheadersがundefinedになってバグる
  const [sheet, setSheet] = useState<string[][]>([[""], [""]]);
  useEffect(() => {
    const gss = async () => {
      const fetchedGss = await fetchGss(url);
      setSheet(fetchedGss as string[][]);
    };
    gss();
  }, []);

  // 生のデータ(string[][])をRowOfSpreadSheet[]に整形 -> 切り出してlibに入れてもいいかも
  sheet.shift(); // FOR TEST: 魔法のスプレッドシートは2行目から情報がはじまるため、テスト用に暫定的にこれで
  const headers = sheet[0];
  sheet.shift();

  const formattedData = sheet.map((row) => {
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
  // 切り出すならここまで

  // 絞り込み用のテキストボックス
  const inputBoxs = headers.map((header) => {
    return (
      <td>
        <input type="text" name={header} placeholder="絞り込み" />
      </td>
    );
  });

  // TODO: ユーザ入力から絞り込んだ(options.shownを変えた)データをfilteredDataに渡す

  return (
    <table>
      <tbody>
        <tr>{inputBoxs}</tr>
        <ShowFilteredData filteredData={formattedData} headers={headers} />
      </tbody>
    </table>
  );
};

export default FilteringBox;
