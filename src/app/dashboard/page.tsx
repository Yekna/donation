import Table from "@/components/Table";
import Link from "next/link";
import {
  getLimitedAmountOfData,
  getCount,
  getLastRow,
  getAllMoney,
} from "@/services/data";
import Chart from "@/components/Chart";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard page made for client",
};

export default async function Dashboard() {
  const { data } = await getLimitedAmountOfData();

  if (!data) return <div>Reached daily limit of api requests</div>;

  const { count } = await getCount();
  const { data: lastRowData } = await getLastRow();
  const { data: money } = await getAllMoney();

  const keyValuePairs = money.map(({ Amount }) => {
    const keyValuePairs = Amount.split(";");
    const result = { "1": 0, "2": 0, "3": 0, "4": 0 };

    keyValuePairs.forEach((pair) => {
      const [key, value] = pair.split(":") as ["1" | "2" | "3" | "4", string];
      if (key.trim() !== "" && value.trim() !== "") {
        const test = parseInt(key) as 1 | 2 | 3 | 4;
        result[test] = parseFloat(value.trim());
      }
    });

    return result;
  });

  const sum = {
    "autizmus alapítvány": 0,
    "lámpás &apos;92 alapítvány": 0,
    "noé állatotthon alapítvány": 0,
    "szent istván király zenei alapítvány": 0,
  };

  keyValuePairs.forEach((pair) => {
    sum["autizmus alapítvány"] += pair[1];
    sum["lámpás &apos;92 alapítvány"] += pair[2];
    sum["noé állatotthon alapítvány"] += pair[3];
    sum["szent istván király zenei alapítvány"] += pair[4];
  });

  return (
    <div className="max-w-7xl mx-auto p-5 bg-white rounded-lg shadow-md text-black">
      <header className="mb-2">
        <nav>
          <ul className="flex justify-between items-center">
            <li>
              <Link href="/">Go back</Link>
            </li>
            <li>
              <h1 className="text-4xl font-extrabold">Dashboard</h1>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <div className="dashboard-item">
          <h2>Total Number of Requests Sent:</h2>
          <p>{count}</p>
        </div>
        <div className="dashboard-item">
          <h2>Total amount of donations per foundation:</h2>
          <ul>
            <li>
              <p>
                Autizmus alapítvány:{" "}
                <span>
                  {sum["autizmus alapítvány"]
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                  Ft
                </span>
              </p>
            </li>
            <li>
              <p>
                Lámpás &apos;92 alapítvány:{" "}
                <span>
                  {sum["lámpás &apos;92 alapítvány"]
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                  Ft
                </span>
              </p>
            </li>
            <li>
              <p>
                Noé állatotthon alapítvány:{" "}
                <span>
                  {sum["noé állatotthon alapítvány"]
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                  Ft
                </span>
              </p>
            </li>
            <li>
              <p>
                Szent istván király zenei alapítvány:{" "}
                <span>
                  {sum["szent istván király zenei alapítvány"]
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                  Ft
                </span>
              </p>
            </li>
          </ul>
        </div>
        <div className="dashboard-item">
          <h2>Date and time of last request:</h2>
          <p>{lastRowData[0].Timestamp}</p>
        </div>
        <div className="mb-5">
          <Table data={data} count={count} />
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-10 [&>*]:flex-1">
          <Chart
            data={[
              {
                title: "autizmus alapítvány",
                value: sum["autizmus alapítvány"],
                color: "#f0f0f0",
              },
              {
                title: "lámpás &apos;92 alapítvány",
                value: sum["lámpás &apos;92 alapítvány"],
                color: "#e0e0e0",
              },
              {
                title: "noé állatotthon alapítvány",
                value: sum["noé állatotthon alapítvány"],
                color: "#d0d0d0",
              },
              {
                title: "szent istván király zenei alapítvány",
                value: sum["szent istván király zenei alapítvány"],
                color: "#c0c0c0",
              },
            ]}
          />
          <div>
            <div className="bg-[#f0f0f0] p-5">autizmus alapítvány</div>
            <div className="bg-[#e0e0e0] p-5">lámpás &apos;92 alapítvány</div>
            <div className="bg-[#d0d0d0] p-5">noé állatotthon alapítvány</div>
            <div className="bg-[#c0c0c0] p-5">
              szent istván király zenei alapítvány
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
