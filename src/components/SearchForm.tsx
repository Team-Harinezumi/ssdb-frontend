import { NextPage } from "next";
import { useEffect, useState } from "react";
import FilteringBox from "@/components/FilteringBox";
import { fetchGss } from "@/api/fetch_gss";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

type Props = {
  defaultUrl: string;
  defaultHeaderIndex: number;
  fixed: number;
};

const SearchForm: NextPage<Props> = ({
  defaultUrl = "",
  defaultHeaderIndex = 1,
  fixed = 0,
}) => {
  // ユーザの入力とバインド
  const [inputUrl, setInputUrl] = useState(defaultUrl);
  // ヘッダ行のインデックス(ユーザ入力)
  const [inputIndex, setInputIndex] = useState(defaultHeaderIndex);
  // ヘッダ行のインデックス(次のコンポーネントに渡す)
  // inputIndexと分けないとデータの表示中にボタンを触った時想定外の挙動
  const [headerIndex, setHeaderIndex] = useState(defaultHeaderIndex);
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
      setSheet(fetchedGss as string[][]);
    };
    gss();
    setHeaderIndex(inputIndex);
  };

  // トップページから入力されて飛んできた時に検索を走らせる
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <>
      {fixed ? (
        <></>
      ) : (
        <>
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
        </>
      )}
      <FilteringBox rawData={sheet} headerIndex={headerIndex} />
    </>
  );
};

export default SearchForm;
