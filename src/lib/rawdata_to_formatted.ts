import type { RowOfSpreadSheet } from "@/models/RowOfSpreadSheet";

export const formattedData = (
  tmpRawData: string[][]
): {
  headers: string[];
  data: RowOfSpreadSheet[];
} => {
  // 実行毎に元データが書き換えられるのを防ぐ
  const clone = require("rfdc")();
  const rawData = clone(tmpRawData) as string[][];

  // 生のデータ(string[][])をRowOfSpreadSheet[]に整形
  rawData.shift(); // FOR TEST: 魔法のスプレッドシートは2行目から情報がはじまるため、テスト用に暫定的にこれで
  const headers = rawData[0];
  rawData.shift();

  return {
    headers: headers,
    data: rawData.map((row) => {
      let formattedRow: RowOfSpreadSheet = {
        data: {},
        options: {
          shown: true,
          folded: true,
        },
      };
      headers.forEach(
        (header, index) => (formattedRow.data[header] = row[index])
      );

      return formattedRow;
    }),
  };
};
