import { NextPage } from "next";
import { useEffect, useState } from "react";
import FilteringBox from "@/components/FilteringBox";
import { fetchGss } from "@/api/fetch_gss";
import { fetchSheetsInfo } from "@/api/fetch_gss";
import { Navbar, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import type { SheetInfo } from "@/models/SheetInfo";

const engineerUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSDSvWQNtJMW5IUsLF6FP12PNt8nSqaqw554UiNnUEYAZlWSp7PU509-M2IJ96D72gpCJznDvyied57/pubhtml";
const businessUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSDSvWQNtJMW5IUsLF6FP12PNt8nSqaqw554UiNnUEYAZlWSp7PU509-M2IJ96D72gpCJznDvyied57/pubhtml";
const designerUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSDSvWQNtJMW5IUsLF6FP12PNt8nSqaqw554UiNnUEYAZlWSp7PU509-M2IJ96D72gpCJznDvyied57/pubhtml";

type Props = {
  type: "engineer" | "business" | "designer";
};

const MagicSpreadSheet: NextPage<Props> = ({ type = "engineer" }) => {
  // SSの整形前のデータ
  const [sheet, setSheet] = useState<string[][]>([]);
  // シートのタイトル
  const [title, setTitle] = useState("");
  // シート情報データのリスト{gid: string: sheetName: string}[]
  const [sheetInfo, setSheetInfo] = useState<SheetInfo[]>([]);
  // 選択中のシートのインデックス(0-index)
  const [sheetIndex, setSheetIndex] = useState(0);

  const genre = ((): {
    url: string;
    jp: string;
    icon: JSX.Element;
  } => {
    if (type === "engineer") {
      return {
        url: engineerUrl,
        jp: "エンジニア",
        icon:<img src="/img/1.png" width="60" alt="エンジニアの画像" />
        ,
      };
    } else if (type === "business") {
      return {
        url: businessUrl,
        jp: "ビジネス",
        icon:<img src="/img/2.png" width="60" alt="ビジネスの画像" />
        ,
      };
    }
    return {
      url: designerUrl,
      jp: "デザイナー",
      icon:<img src="/img/3.png" width="60" alt="エンジニアの画像" />
      ,
    };
  })();

  // シートの切り替え
  const handleSheetChange = (index: number) => {
    setSheetIndex(index);
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

  // URLからSSを呼び、シートを取得(未整形)
  const handleSearch = () => {
    const gss = async () => {
      const sheetData = await fetchSheetsInfo(genre.url);
      if (isValidData(sheetData)) {
        setTitle(sheetData.title);
        setSheetInfo(sheetData.data);
        const fetchedGss = await fetchGss(genre.url, sheetData.data[0].gid);
        setSheet(fetchedGss as string[][]);
      }
    };
    gss();
  };

  // トップページから飛んできた時に検索を走らせる
  useEffect(() => {
    handleSearch();
  }, []);

  // シートの変更を扱う
  useEffect(() => {
    const gss = async () => {
      const fetchedGss = await fetchGss(genre.url, sheetInfo[sheetIndex].gid);
      setSheet(fetchedGss as string[][]);
    };
    if (sheetInfo.length) gss();
  }, [sheetIndex]);

  return (
    <>
      <header className='header'>
        <div className='header_left'>
          <Navbar.Brand href="/">
            <img src="/img/logo.png" alt="" className="header_logo" />
          </Navbar.Brand>
        </div>
        <nav>
        <Nav className="header-list">
          <Nav.Link className='li'  href="/engineer">エンジニア</Nav.Link>
          <Nav.Link className='li'  href="/business">ビジネス</Nav.Link>
          <Nav.Link className='li'  href="/designer">デザイナー</Nav.Link>
        </Nav>
      </nav>
      </header>
      <main className="_main">
        <div className="page_icon">
            {genre.icon}
          <p className='icon_title'>{genre.jp}</p>
        </div>
        <div className='yaer_list'>
          
        {sheetInfo.map((sheet, index) => {
          return (
            <Button
              variant="light"
              name={sheet.gid}
              onClick={() => handleSheetChange(index)}
            >
              {sheet.sheetName}
            </Button>
          );
        })}
          <input className="_input" type="text" placeholder="URL" value={genre.url} disabled />{" "}
        <Button variant="primary">コピー</Button>
      </div>
        <FilteringBox rawData={sheet} headerIndex={2} />
      </main>
      <footer>
        <span className='none'>{title}</span>
      </footer>
    </>
  );
};

export default MagicSpreadSheet;
