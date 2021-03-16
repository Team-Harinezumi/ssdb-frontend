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

export type RowOfSpreadSheet = {
  data: {
    [header: string]: string;
  };
  options: {
    shown: boolean;
  };
};

// 生のデータ(string[][])をRowOfSpreadSheet[]に整形
const formattedData = (rawData: string[][]): RowOfSpreadSheet[] => {
  const headers = rawData[0];
  rawData.shift();

  return rawData.map((row) => {
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
};

// headerと検索したい文字列を受け取り、data.keyにその文字列を含む時データのoptions.shownをtrue、含まない時falseにする
// TODO: インクリメンタルサーチ、レンダリングに使うデータとバインド
const filterDataByInput = (header: string, usersInput: string): void => {
  formattedData(testData).forEach((row) => {
    if (row.data[header].includes(usersInput)) row.options.shown = true;
    else row.options.shown = false;
  });
};

// いらない行の削除ボタンにおけるonclick
// TODO: レンダリングに使うデータとバインド
const deleteRow = (row: RowOfSpreadSheet): void => {
  row.options.shown = false;
};

// データを例えばmaterial-uiのtableに落とし込むならこんな感じかなってやつ
// まだ擬似コードのレベル
/*
const shownRows = formattedData(testData).map((row) => {
  return row.options.shown
    ? (
			<TableRow>
				headers.map((header) => {
					(<TableCell>{row.data.header}</TableCell>)
				})
			</TableRow>
		)
    : <></>;
});

return (
	<>
		<TableContainer>
			<Table>
				<TableBody>
					<TableRow>
						headers.map((header) => {
							(<TableCell>{header}</TableCell>)
						})
					</TableRow>
					{shownRows}
				</TableBody>
			</Table>
		</TableContainer>
	</>
)
*/

// メモ: 削除ボタンの他に選択ボタンを置いて、選択した行のみcsvダウンロードできると便利かも？
// いる結果以外ポチポチ削除、絞り込みは面倒そう
// type RowOfSpreadSheetにoptions.selectedなどを作れば比較的簡単に出来そう

console.log(formattedData(testData));
