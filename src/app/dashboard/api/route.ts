import {
  getAllIdsAfter,
  getCount,
  getAllTimestampsByIp,
} from "@/services/data";
import { convertTimestampToTime } from "@/utils/strings";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParam = url.searchParams.toString().split("=");
  let data;
  let res;

  switch (searchParam[0]) {
    case "page":
      const sort = searchParam[2];
      const indexOf = searchParam[1].indexOf("&");
      const page = Number(searchParam[1].slice(0, indexOf));
      if (sort === "ascending") {
        res = await fetch(
          `https://api.apispreadsheets.com/data/${
            process.env.API_SPREADSHEETS
          }/?query=select * from ${process.env.API_SPREADSHEETS} where id <= ${
            page * 10
          } AND id > ${page * 10 - 10}`,
          {
            cache: "no-store",
          },
        );
      } else {
        const tempRes = await fetch(
          `https://api.apispreadsheets.com/data/${process.env.API_SPREADSHEETS}/?count`,
        );
        const { count } = await tempRes.json();
        res = await fetch(
          `https://api.apispreadsheets.com/data/${
            process.env.API_SPREADSHEETS
          }/?query=select * from ${process.env.API_SPREADSHEETS} where id <= ${
            count - (page - 1) * 10
          } AND id > ${count - page * 10}`,
          {
            cache: "no-store",
          },
        );
      }
      break;
    case "count":
      res = await fetch(
        `https://api.apispreadsheets.com/data/${process.env.API_SPREADSHEETS}/?count`,
      );
      break;
    case "lastRow":
      const tempRes = await fetch(
        `https://api.apispreadsheets.com/data/${process.env.API_SPREADSHEETS}/?count`,
      );
      const { count } = await tempRes.json();
      res = await fetch(
        `https://api.apispreadsheets.com/data/${process.env.API_SPREADSHEETS}/?query=select * from ${process.env.API_SPREADSHEETS} where id=${count}`,
      );
      break;
    case "ip":
      const ip = searchParam[1];
      res = await fetch(
        `https://api.apispreadsheets.com/data/${process.env.API_SPREADSHEETS}/?query=select Timestamp from ${process.env.API_SPREADSHEETS} where IP = '${ip}'`,
      );
      break;
    case "after":
      const id = Number(searchParam[1]);
      res = await fetch(
        `https://api.apispreadsheets.com/data/${process.env.API_SPREADSHEETS}/?query=select id from ${process.env.API_SPREADSHEETS} where id>${id}`,
      );
      break;
    case "amount":
      res = await fetch(
        `https://api.apispreadsheets.com/data/${process.env.API_SPREADSHEETS}/?query=select Amount from ${process.env.API_SPREADSHEETS}`,
      );
    default:
      res = await fetch(
        `https://api.apispreadsheets.com/data/${process.env.API_SPREADSHEETS}/`,
        {
          cache: "no-store",
        },
      );
      break;
  }
  data = await res.json();
  if (searchParam[2] === "descending") {
    data.data.reverse();
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const {
    id,
    donations: { sled1, sled2, sled3, sled4 },
    ip,
    date,
  } = await req.json();
  const { data } = await getAllTimestampsByIp(ip);
  let throwError = false;

  for (let i = 0; i < data.length; i++) {
    const time = convertTimestampToTime(data[i].Timestamp);
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - time;

    if (timeDifference <= 600000) {
      throwError = true;
      break;
    }
  }

  if (throwError)
    return new NextResponse(JSON.stringify({ status: 403 }), {
      status: 403,
      statusText: "Please wait 10min(s) before submitting another request",
    });

  const origin = req.headers.get("origin");

  const res = await fetch(
    `https://api.apispreadsheets.com/data/${process.env.API_SPREADSHEETS}/`,
    {
      method: "POST",
      body: JSON.stringify({
        data: {
          id,
          Amount: `1: ${sled1 * 250000}; 2: ${sled2 * 250000}; 3: ${
            sled3 * 250000
          }; 4: ${sled4 * 250000}`,
          IP: ip || "couldn't find ip",
          Timestamp: date,
        },
      }),
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Content-Type": "application/json",
      },
    },
  );

  const { status } = res;

  return new NextResponse(JSON.stringify({ status }), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// this is REALLY slow and NOT SCALABLE at all but it's the only way i could think of how to make the table's pagination and sorting work after deleting a row
export async function DELETE(req: Request) {
  const origin = req.headers.get("origin");
  const { id } = await req.json();
  const res = await fetch(
    `https://api.apispreadsheets.com/data/${process.env.API_SPREADSHEETS}/?query=delete from ${process.env.API_SPREADSHEETS} where id=${id}`,
  );

  const { count } = await getCount();
  const { data } = await getAllIdsAfter(id);

  const promises = [];
  let counter = 1;

  for (let i = count; i >= id; i--) {
    promises.push(
      fetch(
        `https://api.apispreadsheets.com/data/${process.env.API_SPREADSHEETS}/`,
        {
          method: "POST",
          body: JSON.stringify({
            data: { id: i },
            query: `select id from ${process.env.API_SPREADSHEETS} where id = ${
              data[data.length - counter].id
            }`,
          }),
          headers: {
            "Access-Control-Allow-Origin": origin || "*",
            "Content-Type": "application/json",
          },
        },
      ),
    );
    counter++;
  }

  await Promise.all(promises).catch(console.error);

  const data2 = await res.json();
  return NextResponse.json(data2);
}
