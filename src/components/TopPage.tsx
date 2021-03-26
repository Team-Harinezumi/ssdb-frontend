import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const TopPage: NextPage = () => {
  // URLをユーザの入力とバインド
  const [inputUrl, setInputUrl] = useState("");
  // ヘッダ行のインデックス(ユーザ入力)
  const [inputIndex, setInputIndex] = useState(1);

  // ユーザのURLの入力を取得
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

  // ページを遷移、検索開始、fixedが1だったらヘッダ行調整用のバーを表示しない
  const router = useRouter();
  const pushQuery = (url: string, index: number, fixed: number) => {
    router.push({
      pathname: "/search",
      query: {
        url: url,
        index: index,
        fixed: fixed,
      },
    });
  };
  // ユーザからの入力でページを遷移
  const startSearch = () => {
    pushQuery(inputUrl, inputIndex, 0);
  };
  // 魔法のスプレッドシート(エンジニア)用
  const gotoMagicSpreadSheet = (
    genre: "engineer" | "business" | "designer"
  ) => {
    router.push({
      pathname: genre,
    });
  };

  return (
    <>
      <header>
        <div className='header_left'>
          <img src="/img/logo.png" alt="" className="header_logo" />
        </div>
        <nav>
          <ul className="header_list">
            <li onClick={() => gotoMagicSpreadSheet("engineer")}>
              エンジニア
            </li>
            <li onClick={() => gotoMagicSpreadSheet("business")}>
              ビジネス
            </li>
            <li onClick={() => gotoMagicSpreadSheet("designer")}>
              デザイナー
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <div>
          <div className='content'>
              <img onClick={() => gotoMagicSpreadSheet("business")} src="/img/2.png"className="bi" alt=""/>
              <img onClick={() => gotoMagicSpreadSheet("designer")} src="/img/3.png" className="de" alt=""/>
              <img onClick={() => gotoMagicSpreadSheet("engineer")} src="/img/1.png" className="pr" alt=""/>
          </div>
            <input
            className='input'
            type="text"
            placeholder="URL"
            value={inputUrl}
            onChange={handleChange}
          />
          <button className="button" onClick={startSearch}>検索</button>
          {/* ヘッダの開始行
          <button onClick={handleDecrement}>-</button>
          {inputIndex}
          <button onClick={handleIncrement}>+</button> */}
        </div>
      </main>
      <footer>s</footer>
    </>
  );
};

export default TopPage;
