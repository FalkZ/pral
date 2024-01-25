import { readCSVObjects } from "https://deno.land/x/csv/mod.ts";

const f = await Deno.open("./USDA-PRAL-List.csv");
interface Entry {
  label: string;
  source: string;
  pral: number;
}

let data: Entry[] = [];
for await (const obj of readCSVObjects(f)) {
  data.push({
    label: obj.Product,
    source: "usda",
    pral: parseFloat(obj["PRAL Value"]),
  });
}

f.close();

Deno.writeTextFileSync("./out/usda.json", JSON.stringify(data, null, 2));
