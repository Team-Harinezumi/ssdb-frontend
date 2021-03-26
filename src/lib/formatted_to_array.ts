import type { RowOfSpreadSheet } from "@/models/RowOfSpreadSheet";

export const arrayData = (
  headers: string[],
  data: RowOfSpreadSheet[]
): string[][] => {
  const clone = require("rfdc")();
  const formattedData = clone(data) as RowOfSpreadSheet[];

  return [
    headers,
    ...formattedData
      .filter((row) => row.options.shown)
      .map((row) =>
        Object.values(row.data).map((value) =>
          value.replace(/\n/g, "").replace(/\r/g, "").replace(/-/g, "ー")
        )
      ),
  ];
};
