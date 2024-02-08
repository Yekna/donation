import { ApiSpreadsheets, SingleData } from "@/models/types";

export async function getData(): Promise<ApiSpreadsheets> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/api`);
  if (!res.ok) throw new Error("Failed to get data");

  return res.json();
}

export async function getLimitedAmountOfData(
  page: number = 1
): Promise<ApiSpreadsheets> {
  console.log("limited data");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/api/?page=${page}`
  );
  if (!res.ok) throw new Error("Failed to get limited data");

  return res.json();
}

export async function getCount(): Promise<{ count: number }> {
  console.log("count");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/api/?count=true`
  );
  if (!res.ok) throw new Error("Failed to get row count");

  return res.json();
}

export async function getLastRow(): Promise<{
  data: Array<Pick<SingleData, "Timestamp">>;
}> {
  console.log("last row");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/api/?lastRow=true`
  );
  if (!res.ok) throw new Error("Failed to get row count");

  return res.json();
}
