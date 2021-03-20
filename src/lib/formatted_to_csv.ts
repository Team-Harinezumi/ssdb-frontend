import type { RowOfSpreadSheet } from "@/models/RowOfSpreadSheet";

export const formatted_to_csv = (
  headers: string[],
  data: RowOfSpreadSheet[]
) => {
  return (
    headers.join(",") +
    "\n" +
    data
      .filter((row) => {
        return row.options.shown;
      })
      .map((row) => {
        return Object.values(row.data)
          .map((value) => {
            return value.replace(/\n/g, "").replace(/,/g, "，");
          })
          .join(",");
      })
      .join("\n")
  );
};
