"use client";

import { FC, useCallback, useEffect, useState, useMemo, useTransition } from "react";
import { ApiSpreadsheets, SingleData } from "@/models/types";
import { getLimitedAmountOfData } from "@/services/data";
import { useRouter } from "next/navigation";

type ApiSpreadsheetsWithCount = ApiSpreadsheets & {
  count: number;
};

const Table: FC<ApiSpreadsheetsWithCount> = ({ data, count }) => {
  const [tableData, setTableData] = useState<SingleData[]>(data);
  const [sortOrder, setSortOrder] = useState<"ascending" | "descending">(
    "ascending"
  );

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

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

    fetchData();
  }, [sortOrder, data]);

  const deleteRow = useCallback(async (id: number) => {
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
      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh();
      });
    } else {
      console.error(message);
    }
  }, [router]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>IP</th>
            <th>
              <button
                onClick={() => {
                  setSortOrder((e) =>
                    e === "descending" ? "ascending" : "descending"
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
              <td>{d.Amount}</td>
              <td>{d["IP"]}</td>
              <td>{d["Timestamp"]}</td>
              <td>
                <button onClick={() => deleteRow(d.id)}>x</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between">
        {buttonsArray.length > 1 && buttonsArray.map((index) => (
          <button
            className="p-5 bg-[#f0f0f0] rounded-md"
            style={{ lineHeight: 0 }}
            key={index}
            onClick={async () => {
              const { data } = await getLimitedAmountOfData(index, sortOrder);
              setTableData(data);
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
