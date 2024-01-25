import translatte from "npm:translatte";

const results = [];

for (const all of JSON.parse(Deno.readTextFileSync("./out/av.json"))) {
  const labelEN = await translatte(all.labelDE, { from: "de", to: "en" })
    .then((v) => v.text)
    .catch(() => null);

  console.log(all.labelDE, "=>", labelEN);

  results.push({ ...all, label: labelEN });
}

Deno.writeTextFileSync("out/av.json", JSON.stringify(results, null, 2));
