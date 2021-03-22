import { NextPage } from "next";
import { useState } from "react";
import FilteringBox from "@/components/FilteringBox";
import { fetchGss } from "@/api/fetch_gss";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { fetchSheetsInfo } from "../api/fetch_gss";
import { DownloadButton } from "@/components/DownloadButton"

const SAMPLE = [
  ["Name", "Debut date", "Birthday", "Height", "Fanbase name", "Illustrator", "Twitter"],
  ["Mori Calliope", "September 12, 2020", "April 4th", "167 cm", "", "Yukisame", "https://twitter.com/moricalliope"],
  ["Takanashi Kiara", "September 12, 2020", "July 6th", "165 cm", "", "huke", "https://twitter.com/takanashikiara"]
];

// Material-UIに当てるクラス
const useStyles = makeStyles(() => ({
  searchButton: {
    backgroundColor: "#519FE8",
    "&:hover": {
      backgroundColor: "#519FE8",
    },
    color: "white",
  },
}));

const SearchForm: NextPage = () => {
  // ユーザの入力とバインド
  const [inputUrl, setInputUrl] = useState(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSDSvWQNtJMW5IUsLF6FP12PNt8nSqaqw554UiNnUEYAZlWSp7PU509-M2IJ96D72gpCJznDvyied57/pubhtml"
  );
  // ヘッダ行のインデックス(ユーザ入力)
  const [inputIndex, setInputIndex] = useState(1);
  // ヘッダ行のインデックス(次のコンポーネントに渡す)
  // inputIndexと分けないとデータの表示中にボタンを触った時想定外の挙動
  const [headerIndex, setHeaderIndex] = useState(1);
  // SSの整形前のデータ
  const [sheet, setSheet] = useState<string[][]>([]);

  const classes = useStyles();

  // ユーザの入力を取得
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setInputUrl(event.target.value as string);
  };
  // インデックスを1増やす
  const handleIncrement = () => {
    setInputIndex((inputIndex) => inputIndex + 1);
  };
  // インデックスを1減らす
  const handleDecrement = () => {
    if (inputIndex === 1) return;
    setInputIndex((inputIndex) => inputIndex - 1);
  };

  // 検索ボタンを押すと入力したURLからSSが呼ばれ、シートを取得(未整形)
  const handleSearch = () => {
    const gss = async () => {
      const fetchedGss = await fetchGss(inputUrl);
      const tmp = await fetchSheetsInfo(inputUrl);
      console.log(tmp)
      setSheet(fetchedGss as string[][]);
    };
    gss();
    setHeaderIndex(inputIndex);
  };

  return (
    <>
      <DownloadButton
        fileName='spread-sheet'
        data={SAMPLE}
      />
      <input
        type="text"
        placeholder="URL"
        value={inputUrl}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        className={classes.searchButton}
        onClick={handleSearch}
      >
        検索
      </Button>
      ヘッダの開始行
      <button onClick={handleDecrement}>-</button>
      {inputIndex}
      <button onClick={handleIncrement}>+</button>
      <FilteringBox rawData={sheet} headerIndex={headerIndex} />
    </>
  );
};

export default SearchForm;
