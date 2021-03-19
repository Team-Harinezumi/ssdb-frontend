import { NextPage } from "next";
import { useState, useEffect } from "react";
import ShowFilteredData from "./ShowFilteredData";
import { formattedData } from "../../lib/rawdata_to_formatted";
import type { RowOfSpreadSheet } from "./ShowFilteredData";

type props = {
  rawData: string[][];
};

const FilteringBox: NextPage<props> = ({ rawData = [[""], [""]] }) => {
  // ユーザの入力
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  // 表示するデータ
  const [data, setData] = useState<RowOfSpreadSheet[]>([]);

  // rawDataの内容が変わったら(検索ボタンが押されたら)ヘッダとデータをリセット
  const { headers } = formattedData(rawData);
  useEffect(() => {
    setData(formattedData(rawData).data);
  }, [rawData]);

  // 絞り込み用テキストボックスの変更とデータをバインド
  const handleChange = (
    event: React.ChangeEvent<{ name: unknown; value: unknown }>
  ) => {
    setInputs({
      ...inputs,
      [event.target.name as string]: event.target.value as string,
    });
  };

  // 絞り込み用のテキストボックス
  const inputBoxs = headers.map((header) => {
    return (
      <td>
        <input
          type="text"
          name={header}
          value={inputs.header}
          placeholder="絞り込み"
          onChange={handleChange}
        />
      </td>
    );
  });

  // ユーザ入力から絞り込んだ(options.shownを変えた)データをdataに渡す
  useEffect(() => {
    setData(
      data.map((row) => {
        // flag 使わずに書きたい(forEach内はbreak出来ず、returnするとforEach内でcontinueのようになるだけ)
        // for of とかで良さそう
        let flag: boolean = true;
        Object.keys(inputs).forEach((key) => {
          if (inputs[key] && !row.data[key].includes(inputs[key])) {
            flag = false;
          }
        });
        return { ...row, options: { shown: flag } };
      })
    );
  }, [inputs]);

  return (
    <table>
      <tbody>
        <tr>{inputBoxs}</tr>
        <ShowFilteredData filteredData={data} headers={headers} />
      </tbody>
    </table>
  );
};

export default FilteringBox;
