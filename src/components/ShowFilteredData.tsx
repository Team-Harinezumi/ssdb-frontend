import { NextPage } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import { RowOfSpreadSheet } from "@/models/RowOfSpreadSheet";
import { TableCell, TableRow, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

type Props = {
  filteredData: RowOfSpreadSheet[];
  headers: string[];
};

// Material-UIに当てるクラス
const useStyles = makeStyles(() => ({
  deleteButton: {
    backgroundColor: "#E57070",
    "&:hover": {
      backgroundColor: "#E57070",
    },
    color: "white",
  },
}));

const ShowFilteredData: NextPage<Props> = ({
  filteredData = [],
  headers = [""],
}) => {
  // 表示するデータ
  const [shownData, setShownData] = useState<RowOfSpreadSheet[]>(filteredData);

  const classes = useStyles();

  // ユーザの入力によってデータが変わった時に入れ直し
  useEffect(() => {
    setShownData(filteredData);
  }, [filteredData]);

  // 削除ボタンが押された時に変更
  const deleteRow = (index: number) => {
    let tmp = require("rfdc")()(shownData) as RowOfSpreadSheet[];
    tmp[index].options.shown = false;
    setShownData(tmp);
  };

  // 展開用のリンクが押された時に変更
  const switchFolded = (index: number) => {
    let tmp = require("rfdc")()(shownData) as RowOfSpreadSheet[];
    tmp[index].options.folded = !tmp[index].options.folded;
    setShownData(tmp);
  };

  // 表示する表のヘッダー用のjsxを生成
  const headerForTable = headers.map((header) => (
    <TableCell>{header}</TableCell>
  ));

  // スプレッドシートの列を表示するjsxを生成
  const singleRow = (row: RowOfSpreadSheet, index: number) =>
    headers.map((header) => {
      if (!row.data[header]) {
        return <TableCell></TableCell>;
      } else if (row.data[header].length <= 25) {
        return <TableCell>{row.data[header]}</TableCell>;
      } else if (row.options.folded) {
        return (
          <TableCell>
            {row.data[header].slice(0, 25)}
            <Link href="#">
              <a onClick={() => switchFolded(index)}>...</a>
            </Link>
          </TableCell>
        );
      }
      return (
        <TableCell>
          {row.data[header]}
          <Link href="#">
            <a onClick={() => switchFolded(index)}>...</a>
          </Link>
        </TableCell>
      );
    });

  // row.options.shownがtrueである行を表にしてまとめて表示
  const shownRows = shownData.map((row, index) => {
    return row.options.shown ? (
      <TableRow>
        <TableCell>
          <Button
            variant="contained"
            onClick={() => deleteRow(index)}
            className={classes.deleteButton}
          >
            削除
          </Button>
        </TableCell>
        {singleRow(row, index)}
      </TableRow>
    ) : (
      <></>
    );
  });

  return (
    <>
      <TableRow>
        <TableCell></TableCell>
        {headerForTable}
      </TableRow>
      {shownRows}
    </>
  );
};

export default ShowFilteredData;
