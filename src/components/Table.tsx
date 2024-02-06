"use client";

import { FC, useCallback, useEffect, useState } from "react";

// TODO: export once so you can use it multiple times
type Props = {
  data: Array<{ Iznos: string; "IP adresa": string; "Vreme Slanja": string }>;
};

const Table: FC<Props> = ({ data }) => {
  const [tableData, setTableData] = useState(data);

  const deleteRow = useCallback(
    async (amount: string) => {
      const res = await fetch(
        `https://api.apispreadsheets.com/data/PSPaDbOSTfEaMs6y/?query=delete from PSPaDbOSTfEaMs6y where Iznos='${amount}'`
      );
      const { message } = await res.json();
      if (message !== "No rows were deleted") {
        console.log(message);
        setTableData(tableData.filter((d) => d.Iznos !== amount));
      } else {
        console.error(message);
      }
    },
    [tableData]
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Iznos</th>
          <th>IP Adresa</th>
          <th>Vreme Slanja</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {tableData.map((d, key) => (
          <tr key={key}>
            <td>{d.Iznos}</td>
            <td>{d["IP adresa"]}</td>
            <td>{d["Vreme Slanja"]}</td>
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
