"use client";

import { FC, useCallback, useEffect, useState, useMemo } from "react";
import { ApiSpreadsheets, SingleData } from "@/models/types";
import { getLimitedAmountOfData } from "@/services/data";

type ApiSpreadsheetsWithCount = ApiSpreadsheets & {
  count: number;
};

const Table: FC<ApiSpreadsheetsWithCount> = ({ data, count }) => {
  const [tableData, setTableData] = useState<SingleData[]>(data);
  const [sortOrder, setSortOrder] = useState<"ascending" | "descending">(
    "ascending"
  );

  const buttonsArray = useMemo(
    () =>
      Array.from({ length: Math.ceil(count / 10) }, (_, index) => index + 1),
    [count]
  );

  useEffect(() => {
    const fetchData = async () => {
        const { data } = await getLimitedAmountOfData(1, sortOrder);
        setTableData(data);
    };

    fetchData().then(() => {
      if(sortOrder === 'descending') {
        setTableData(d => d!.slice().reverse())
      }
    });
  }, [sortOrder, data]);

  const deleteRow = useCallback(
    async (id: number) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/api`,
        {
          method: "DELETE",
          body: JSON.stringify({ id }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { message } = await res.json();
      if (message !== "No rows were deleted") {
        // TODO: add state for tracking current index so the user stays on the same page
        const { data } = await getLimitedAmountOfData();
        setTableData(data);
      } else {
        console.error(message);
      }
    },
    []
  );

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Iznos</th>
            <th>IP Adresa</th>
            <th>
              <button
                onClick={() => {
                  setSortOrder((e) =>
                    e === "descending"
                      ? "ascending"
                      : "descending"
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
      <div className="flex justify-between">
        {buttonsArray.map((index) => (
          <button
            key={index}
            onClick={async () => {
                const { data } = await getLimitedAmountOfData(index, sortOrder);
                if(sortOrder === 'descending') {
                  setTableData(() => data.slice().reverse());
                } else {
                  setTableData(data);
                }
            }}
          >
            {index}
          </button>
        ))}
      </div>
    </>
  );
};

export default Table;