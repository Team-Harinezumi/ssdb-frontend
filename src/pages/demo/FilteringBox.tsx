import { NextPage } from "next";
import { useState, useEffect } from "react";
import ShowFilteredData from "./ShowFilteredData";
import { formattedData } from "../../lib/rawdata_to_formatted";
import type { RowOfSpreadSheet } from "@/models/RowOfSpreadSheet";

type Props = {
  rawData: string[][];
};

const FilteringBox: NextPage<Props> = ({ rawData = [] }) => {
  // 初期状態では何も描画しない
  if (!rawData.length) {
    return <></>;
  }

  // ユーザの入力
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  // 表示するデータ
  const [data, setData] = useState<RowOfSpreadSheet[]>(
    formattedData(rawData).data
  );

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
        for (const key of Object.keys(inputs)) {
          if (inputs[key] && !row.data[key].includes(inputs[key])) {
            return { ...row, options: { shown: false, folded: true } };
          }
        }

        return { ...row, options: { shown: true, folded: true } };
      })
    );
  }, [inputs]);

  return (
    <table>
      <tbody>
        <tr>
          <td></td>
          {inputBoxs}
        </tr>
        <ShowFilteredData filteredData={data} headers={headers} />
      </tbody>
    </table>
  );
};

export default FilteringBox;
