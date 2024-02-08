"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { ApiSpreadsheets } from "@/models/types";
import { getData } from "@/services/data";

const Table: FC<ApiSpreadsheets> = ({ data }) => {
  const [tableData, setTableData] = useState(data);
  const [sortOrder, setSortOrder] = useState<"ascending" | "descending">(
    "ascending"
  );

  useEffect(() => {
    if (sortOrder === "descending") {
      setTableData((data) =>
        data
          .map((d) => {
            const newDate = new Date(d.Timestamp);
            return { ...d, Timestamp: newDate };
          })
          .sort((a, b) => a.Timestamp.getTime() - b.Timestamp.getTime())
          .map((d) => ({ ...d, Timestamp: `${d.Timestamp.toISOString()}` }))
      );
    } else {
      const reversed = data.slice().reverse();
      setTableData(reversed);
    }
  }, [sortOrder, data]);

  const deleteRow = useCallback(
    async (id: number) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/api`,
        {
          method: "DELETE",
          body: JSON.stringify({ id, data: data[data.length - 1] }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { message } = await res.json();
      if (message !== "No rows were deleted") {
        const { data } = await getData();
        setTableData(data);
      } else {
        console.error(message);
      }
    },
    [data]
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
                  e === "ascending" ? "descending" : "ascending"
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
            <td>{d["Timestamp"]}</td>
            <td>
              <button onClick={() => deleteRow(d.id)}>x</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
