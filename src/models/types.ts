export type SingleData = {
  id: number;
  Iznos: string;
  "IP": string;
  Timestamp: string;
}

export type ApiSpreadsheets = {
  data: Array<SingleData>;
};
