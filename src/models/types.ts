export type SingleData = {
  id: number;
  Amount: string;
  IP: string;
  Timestamp: string;
};

export type ApiSpreadsheets = {
  data: Array<SingleData>;
};
