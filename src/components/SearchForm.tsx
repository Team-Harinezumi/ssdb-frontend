import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FilteringBox from "@/components/FilteringBox";
import { fetchGss } from "@/api/fetch_gss";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { fetchSheetsInfo } from "../api/fetch_gss";

import type { SheetInfo } from "@/models/SheetInfo";

const engineerUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSDSvWQNtJMW5IUsLF6FP12PNt8nSqaqw554UiNnUEYAZlWSp7PU509-M2IJ96D72gpCJznDvyied57/pubhtml";

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
  // ユーザのURL入力とバインド
  const [inputUrl, setInputUrl] = useState(defaultUrl);
  // ヘッダ行のインデックス(ユーザ入力)
  const [inputHeaderIndex, setInputIndex] = useState(defaultHeaderIndex);
  // ヘッダ行のインデックス(次のコンポーネントに渡す)
  // inputIndexと分けないとデータの表示中にボタンを触った時想定外の挙動
  const [headerIndex, setHeaderIndex] = useState(defaultHeaderIndex);
  // URLが魔法のスプレッドシートかどうか
  const [isMagicSpreadSheet, setIsMagicSpreadSheet] = useState(false);
  // SSの整形前のデータ
  const [sheet, setSheet] = useState<string[][]>([]);
  // シートのタイトル
  const [title, setTitle] = useState("");
  // シート情報データのリスト{gid: string: sheetName: string}[]
  const [sheetInfo, setSheetInfo] = useState<SheetInfo[]>([]);
  // 選択中のシートのインデックス(0-index)
  const [sheetIndex, setSheetIndex] = useState(0);

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
    if (inputHeaderIndex === 1) return;
    setInputIndex((inputIndex) => inputIndex - 1);
  };
  // シートの切り替え
  const handleSheetChange = (index: number) => {
    setSheetIndex(index);
  };
  // トップへ戻る
  const router = useRouter();
  const goToTop = () => {
    router.push({
      pathname: "/",
    });
  };

  // SheetInfoの配列であることを保証する型ガード
  const isSheetInfoArray = (arg: unknown): arg is SheetInfo[] => {
    const info = arg as SheetInfo[];

    return info.every(
      (i) => typeof i?.gid === "string" && typeof i?.sheetName === "string"
    );
  };
  // 正しいデータが返ってきていることを保証する型ガード
  const isValidData = (
    arg: unknown
  ): arg is {
    title: string;
    data: SheetInfo[];
  } => {
    const data = arg as {
      title: string;
      data: SheetInfo[];
    };
    return typeof data?.title === "string" && isSheetInfoArray(data.data);
  };

  // 検索ボタンを押すと入力したURLからSSが呼ばれ、シートを取得(未整形)
  const handleSearch = () => {
    const gss = async () => {
      const sheetData = await fetchSheetsInfo(inputUrl);
      if (isValidData(sheetData)) {
        setTitle(sheetData.title);
        setSheetInfo(sheetData.data);
        const fetchedGss = await fetchGss(inputUrl, sheetData.data[0].gid);
        setSheet(fetchedGss as string[][]);
      }
    };
    gss();
    setHeaderIndex(inputHeaderIndex);
  };

  // トップページから入力されて飛んできた時に検索を走らせる
  useEffect(() => {
    handleSearch();
  }, []);

  // 魔法のスプレッドシートが入力されているか判定する
  useEffect(() => {
    if (inputUrl === engineerUrl) {
      setIsMagicSpreadSheet(true);
      setInputIndex(2);
      setHeaderIndex(2);
    } else {
      setIsMagicSpreadSheet(false);
    }
  }, [inputUrl]);

  // シートの変更を扱う
  useEffect(() => {
    const gss = async () => {
      const fetchedGss = await fetchGss(inputUrl, sheetInfo[sheetIndex].gid);
      setSheet(fetchedGss as string[][]);
    };
    if (sheetInfo.length) gss();
    setHeaderIndex(inputHeaderIndex);
  }, [sheetIndex]);

  return (
    <>
      <div>
        <button onClick={goToTop}>トップへ戻る</button>
        <input
          type="text"
          placeholder="URL"
          value={inputUrl}
          onChange={handleChange}
        />
        {fixed ? (
          <></>
        ) : (
          <>
            <Button
              variant="contained"
              className={classes.searchButton}
              onClick={handleSearch}
            >
              検索
            </Button>
            {isMagicSpreadSheet ? (
              <></>
            ) : (
              <>
                ヘッダの開始行
                <button onClick={handleDecrement}>-</button>
                {inputHeaderIndex}
                <button onClick={handleIncrement}>+</button>
              </>
            )}
          </>
        )}
      </div>
      <div>{title}</div>
      <div>
        {sheetInfo.map((sheet, index) => {
          return (
            <button name={sheet.gid} onClick={() => handleSheetChange(index)}>
              {sheet.sheetName}
            </button>
          );
        })}
      </div>
      <FilteringBox rawData={sheet} headerIndex={headerIndex} />
    </>
  );
};

export default SearchForm;
