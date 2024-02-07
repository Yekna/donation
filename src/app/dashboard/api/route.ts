import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    `https://api.apispreadsheets.com/data/${process.env.API_SPREADSHEETS}/`,
    {
      next: { revalidate: 30 },
    }
  );

  const data = await res.json();

  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
  const { amount } = await req.json();
  const res = await fetch(
    `https://api.apispreadsheets.com/data/${process.env.API_SPREADSHEETS}/?query=delete from ${process.env.API_SPREADSHEETS} where Iznos='${amount}'`
  );

  const data = await res.json();
  return NextResponse.json(data);
}
