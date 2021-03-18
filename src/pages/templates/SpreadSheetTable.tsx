import { NextPage } from "next";

const testData = [
  [
    "Name",
    "Debut date",
    "Birthday",
    "Height",
    "Fanbase name",
    "Illustrator",
    "Twitter",
  ],
  [
    "Mori Calliope",
    "September 12, 2020",
    "April 4th",
    "167 cm",
    "",
    "Yukisame",
    "https://twitter.com/moricalliope",
  ],
  [
    "Takanashi Kiara",
    "September 12, 2020",
    "July 6th",
    "165 cm",
    "",
    "huke",
    "https://twitter.com/takanashikiara",
  ],
];

type RowOfSpreadSheet = {
  data: {
    [header: string]: string;
  };
  options: {
    shown: boolean;
  };
};

type Props = {
  rawData: string[][];
};

const SpreadSheetTable: NextPage<Props> = ({ rawData = testData }) => {
  // 生のデータ(string[][])をRowOfSpreadSheet[]に整形
  const headers = rawData[0];
  rawData.shift();

  const formattedData = rawData.map((row) => {
    let formattedRow: RowOfSpreadSheet = {
      data: {},
      options: {
        shown: true,
      },
    };
    headers.forEach(
      (header, index) => (formattedRow.data[header] = row[index])
    );

    return formattedRow;
  });

  // 表示する表のヘッダー用のjsxを生成
  const headerForTable = headers.map((header) => <td>{header}</td>);

  // スプレッドシートの列を表示するjsxを生成
  const singleRow = (row: RowOfSpreadSheet) =>
    headers.map((header) => {
      return <td>{row.data[header]}</td>;
    });

  // 表にして表示、この時row.options.shownがtrueである必要がある
  const shownRows = formattedData.map((row) => {
    return row.options.shown ? <tr>{singleRow(row)}</tr> : <></>;
  });

  return (
    <>
      <table>
        <tbody>
          <tr>{headerForTable}</tr>
          {shownRows}
        </tbody>
      </table>
    </>
  );
};

export default SpreadSheetTable;
