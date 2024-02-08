export type SingleData = {
  id: number;
  Iznos: string;
  "IP adresa": string;
  Timestamp: string;
}

export type ApiSpreadsheets = {
  data: Array<SingleData>;
};
