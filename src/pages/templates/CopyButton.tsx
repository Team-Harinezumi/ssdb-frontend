import { NextPage } from "next";

const CopyButton: NextPage = () => {
  const copyTable = () => {
    // TODO: 表示されている表をコピー
    console.log("clicked");
  };

  return <button onClick={copyTable}>コピー</button>;
};

export default CopyButton;
