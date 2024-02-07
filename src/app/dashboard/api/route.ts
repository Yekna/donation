import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    `https://api.apispreadsheets.com/data/${process.env.API_SPREADSHEETS}/`
  );

  const data = await res.json();

  return NextResponse.json(data);
}

// TODO: create middleware
export async function POST(req: Request) {
  const {
    donations: { sled1, sled2, sled3, sled4 },
    ip,
    date,
  } = await req.json();

  const origin = req.headers.get("origin");

  const res = await fetch(
    `https://api.apispreadsheets.com/data/${process.env.API_SPREADSHEETS}/`,
    {
      method: "POST",
      body: JSON.stringify({
        data: {
          Iznos: `1: ${sled1 * 250000}; 2: ${sled2 * 250000}; 3: ${
            sled3 * 250000
          }; 4: ${sled4 * 250000}`,
          "IP adresa": ip || "couldn't find ip",
          Timestamp: date,
        },
      }),
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Content-Type": "application/json",
      },
    }
  );

  const { status } = res;

  return new NextResponse(JSON.stringify({ status }), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// TODO: figure out a way to query based on timestamp
export async function DELETE(req: Request) {
  const { amount } = await req.json();
  const res = await fetch(
    `https://api.apispreadsheets.com/data/${process.env.API_SPREADSHEETS}/?query=delete from ${process.env.API_SPREADSHEETS} where Iznos='${amount}'`
  );

  const data = await res.json();
  return NextResponse.json(data);
}
