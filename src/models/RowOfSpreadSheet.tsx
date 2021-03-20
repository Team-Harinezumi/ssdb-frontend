export type RowOfSpreadSheet = {
  data: {
    [header: string]: string;
  };
  options: {
    shown: boolean;
    folded: boolean;
  };
};
