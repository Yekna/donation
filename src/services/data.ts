import { ApiSpreadsheets, SingleData } from "@/models/types";

export async function getData(): Promise<ApiSpreadsheets> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/api`);
  if (!res.ok) throw new Error("Failed to get data");

  return res.json();
}

export async function getLimitedAmountOfData(
  page: number = 1,
  sort: "ascending" | "descending" = "ascending"
): Promise<ApiSpreadsheets> {
  let res;
  res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/api/?page=${page}&sort=${sort}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Failed to get limited data");

  return res.json();
}

export async function getCount(): Promise<{ count: number }> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/api/?count=true`
  );
  if (!res.ok) throw new Error("Failed to get row count");

  return res.json();
}

export async function getLastRow(): Promise<ApiSpreadsheets> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/api/?lastRow=true`
  );
  if (!res.ok) throw new Error("Failed to get last row");

  return res.json();
}

export async function getAllRowsAfter(id: number): Promise<ApiSpreadsheets> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/api/?after=${id}`
  );
  if (!res.ok) throw new Error(`Failed to get all rows after ${id}`);

  return res.json();
}

export async function getAllTimestampsByIp(ip: string): Promise<{
  data: Pick<SingleData, "Timestamp">[];
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/api/?ip=${ip}`
  );
  if (!res.ok) throw new Error("Failed to get ip address");

  return res.json();
}

export async function getAllMoney(): Promise<{
  data: Pick<SingleData, "Amount">[];
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/api/?amount=true`
  );
  if (!res.ok) throw new Error("Failed to get money");

  return res.json();
}
