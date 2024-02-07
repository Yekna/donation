"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { ApiSpreadsheets } from "@/models/types";

const Table: FC<ApiSpreadsheets> = ({ data }) => {
  const [tableData, setTableData] = useState(data);
  const [sortOrder, setSortOrder] = useState<"ascending" | "descending">(
    "ascending",
  );

  useEffect(() => {
    if (sortOrder === "descending") {
      setTableData((data) =>
        data!
          .map((d) => {
            const newDate = new Date(d.Timestamp);
            console.log({ newDate });
            return { ...d, Timestamp: newDate };
          })
          .sort((a, b) => a.Timestamp.getTime() - b.Timestamp.getTime())
          .map((d) => ({ ...d, Timestamp: `${d.Timestamp.toISOString()}` })),
      );
    } else {
      const reversed = data.slice().reverse();
      setTableData(reversed);
    }
  }, [sortOrder, data]);

  const deleteRow = useCallback(
    async (amount: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/api`,
        {
          method: "DELETE",
          body: JSON.stringify({ amount }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const { message } = await res.json();
      if (message !== "No rows were deleted") {
        console.log(message);
        setTableData(tableData!.filter((d) => d.Iznos !== amount));
      } else {
        console.error(message);
      }
    },
    [tableData],
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Iznos</th>
          <th>IP Adresa</th>
          <th>
            <button
              onClick={() => {
                setSortOrder((e) =>
                  e === "ascending" ? "descending" : "ascending",
                );
              }}
            >
              Timestamp
            </button>
          </th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {tableData.map((d, key) => (
          <tr key={key}>
            <td>{d.Iznos}</td>
            <td>{d["IP adresa"]}</td>
            <td>{d["Timestamp"] as string}</td>
            <td>
              <button onClick={() => deleteRow(d["Iznos"])}>x</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
