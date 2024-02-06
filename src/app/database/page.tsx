import Table from "@/components/Table";

type Api = {
  data: Array<{ Iznos: string; "IP adresa": string; "Vreme Slanja": string }>;
};

async function getNumberOfRows(): Promise<{ count: number }> {
  const res = await fetch(
    "https://api.apispreadsheets.com/data/PSPaDbOSTfEaMs6y/?count"
  );
  if (!res.ok) throw new Error("Failed to get number of rows");

  return res.json();
}

async function getData(): Promise<Api> {
  const res = await fetch(
    "https://api.apispreadsheets.com/data/PSPaDbOSTfEaMs6y/"
  );
  if (!res.ok) throw new Error("Failed to get data");

  return res.json();
}

export default async function Database() {
  const [{ count }, { data }] = await Promise.all([
    getNumberOfRows(),
    getData(),
  ]);

  // TODO: create type
  const keyValuePairs = data.map(({ Iznos }) => {
    const keyValuePairs = Iznos.split(";");
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

  const date = data[data.length - 1]["Vreme Slanja"];

  //   TODO: use english words instead of serbian
  return (
    <main>
      <header>
        <nav>
          <ul>
            <li>
              <a href="/">Go back</a>
            </li>
          </ul>
        </nav>
      </header>
      <p>Ukupan broj poslatih zahteva: {count}</p>
      <ul>
        <p>Ukupan iznos donacija po fondaciji:</p>
        <li>autizmus alapítvány: {sum["autizmus alapítvány"]} Ft</li>
        <li>
          lámpás &apos;92 alapítvány: {sum["lámpás &apos;92 alapítvány"]} Ft
        </li>
        <li>
          noé állatotthon alapítvány: {sum["noé állatotthon alapítvány"]} Ft
        </li>
        <li>
          szent istván király zenei alapítvány:{" "}
          {sum["szent istván király zenei alapítvány"]} Ft
        </li>
      </ul>
      <p>Datum i vreme poslednjeg zahteva: {date}</p>
      <Table data={data} />
    </main>
  );
}
