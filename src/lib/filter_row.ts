import type { RowOfSpreadSheet } from "../pages/templates/SpreadSheetTable";

export const filteredData = (
  header: string,
  input: string,
  spreadsheetData: RowOfSpreadSheet[]
): RowOfSpreadSheet[] => {
  if (input === "") return spreadsheetData;

  return spreadsheetData.map((row) => {
    return { ...row, options: { shown: row.data[header].includes(input) } };
  });
};
