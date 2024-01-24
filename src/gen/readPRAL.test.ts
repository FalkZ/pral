import { get } from "svelte/store";
import { test } from "vitest";
import { writeFileSync } from "node:fs";

function createRegex(startString) {
  // Escape special characters in the start string
  const escapedStartString = startString.replace(
    /[-\/\\^$*+?.()|[\]{}]/g,
    "\\$&"
  );

  // Create the regex
  const regex = new RegExp(
    "PRAL Wert für " + escapedStartString + ": (-?[0-9]*\\.?[0-9]+)"
  );

  return regex;
}

// this function posts form data to the server
const getPRALByName = async (name: string) => {
  const data = new FormData();
  data.append("unique", "true");
  data.append("searchrequest", name);
  data.append("lang", "DE");

  const response = await fetch(
    "https://www.avogel.ch/av3/ajax/_ajax-av3_pral_search.php",
    {
      method: "POST",
      body: data,
    }
  );
  const text = await response.text();

  const regex = createRegex(name);

  const match = regex.exec(text);

  return parseFloat(match[1]);
};

// https://www.avogel.ch/de/extras/pral-o-meter.php?lang=DE
const readLabels = () =>
  JSON.stringify(
    [...document.querySelector(".search-results")?.children].map(
      (el) => el.textContent
    )
  );

const labels = [
  "Aal geräuchert",
  "Amaranth (Samen)",
  "Ananas",
  "Apfelessig",
  "Apfelsaft, ungesüsst",
  "Aprikosen",
  "Bananen",
  "Basilikum",
  "Bier, Pilsener Art",
  "Bier, dunkel",
  "Bier, hell",
  "Bierschinken",
  "Birnen",
  "Bitterschokolade",
  "Blumenkohl",
  "Bohnen, grün",
  "Broccoli",
  "Buchweizen (ganzes Korn)",
  "Butter",
  "Butterkäse (50% Fett i. Tr.)",
  "Buttermilch",
  "Camembert",
  "Cervelatwurst",
  "Cheddar, reduzierter Fettgehalt",
  "Chicorée",
  "Cola",
  "Corned beef, in Dosen",
  "Cornflakes",
  "Dinkel (Grünkern Vollkorn)",
  "Edamer",
  "Eiernudeln",
  "Eigelb",
  "Eis, Fruchteis, gemischt",
  "Eis, Milcheis, Vanille",
  "Eisbergsalat",
  "Eiweiss",
  "Emmentaler (45% Fett i. Tr.)",
  "Ente",
  "Erbsen",
  "Erdbeeren",
  "Erdnüsse, unbehandelt",
  "Espresso, Aufguss",
  "Essiggurken",
  "Feigen, getrocknet",
  "Feldsalat",
  "Fenchel",
  "Fleischwurst",
  "Forelle, gedämpft",
  "Frankfurter",
  "Frischkäse",
  "Fruchtjoghurt aus Vollmilch",
  "Früchtetee, Aufguss",
  "Frühstücksfleisch, in Dosen",
  "Gans (reines Muskelfleisch)",
  "Garnele",
  "Gemüsesaft (Tomate, Rote-Rübe, Möhre)",
  "Gerste (ganzes Korn)",
  "Gouda",
  "Grahambrot",
  "Grapefruit",
  "Grapefruitsaft, ungesüsst",
  "Grünkohl",
  "Grüntee, Aufguss",
  "Gurken",
  "Haferflocken (Vollkorn)",
  "Hartkäse, Durchschnitt von 4 Sorten",
  "Haselnüsse",
  "Heilbutt",
  "Hering",
  "Hirse (ganzes Korn)",
  "Honig",
  "Hühnerei",
  "Hühnerfleisch",
  "Hüttenkäse, Vollfettstufe",
  "Jagdwurst",
  "Kabeljaufillet",
  "Kaffee,  Aufguss, 5 Minuten",
  "Kakao, herg. aus entrahmter Milch (3,5%)",
  "Kalbfleisch",
  "Kalbfleisch",
  "Kaninchen",
  "Karotten, junge",
  "Karpfen",
  "Kartoffeln",
  "Kefir",
  "Kirschen",
  "Kiwi",
  "Knoblauch",
  "Kohlrabi",
  "Kondensmilch",
  "Kopfsalat, Durchschnitt von 4 Sorten",
  "Krabben",
  "Kräutertee",
  "Kuhmilch 1,5%",
  "Lachs",
  "Lammfleisch (mager)",
  "Lauch (Porree)",
  "Leber (Kalb)",
  "Leber (Rind)",
  "Leber (Schwein)",
  "Leberwurst",
  "Linsen, grün und braun, getrocknet",
  "Mais (ganzes Korn)",
  "Makkaroni",
  "Mandeln",
  "Mango",
  "Margarine",
  "Marmelade",
  "Matjeshering",
  "Miesmuscheln",
  "Milchschokolade",
  "Mineralwasser mit Kohlensäure",
  "Molke",
  "Möhrensaft",
  "Naturjoghurt aus Vollmilch",
  "Nussnugatcreme",
  "Olivenöl",
  "Orangen",
  "Orangensaft, ungesüsst",
  "Paprikaschoten (rot)",
  "Parmesan",
  "Petersilie",
  "Pfirsiche",
  "Pilze (Pfifferling)",
  "Pistazien",
  "Pumpernickel",
  "Quark",
  "Radieschen",
  "Reis, geschält",
  "Reis, geschält, gekocht",
  "Reis, ungeschält",
  "Rindfleisch, mager",
  "Roggenbrot",
  "Roggenknäckebrot",
  "Roggenmehl (Typ 650)",
  "Roggenmischbrot",
  "Roggenvollkornmehl",
  "Rohrzucker braun",
  "Rosenkohl",
  "Rosinen",
  "Rotbarsch",
  "Rote-Rübe-Saft",
  "Rotwein",
  "Ruccola",
  "Rumpsteak, mager und fett",
  "Sahne, frisch, sauer",
  "Salami",
  "Sandkuchen",
  "Sardinen in Öl",
  "Sauerkraut",
  "Schellfisch",
  "Schmelzkäse, natur",
  "Schnittlauch",
  "Schwarze Johannisbeeren",
  "Schweinefleisch, mager",
  "Seezunge",
  "Sellerie",
  "Shrimps",
  "Sojabohnen",
  "Sojamilch",
  "Sonnenblumenöl",
  "Spargel",
  "Spinat",
  "Spätzle",
  "Tafelwasser",
  "Tee, Indisch, Aufguss",
  "Tofu (Sojabohne, gedämpft)",
  "Tomaten",
  "Tomatensaft",
  "Traubensaft",
  "Truthahnfleisch",
  "Vollkornbrot",
  "Vollkornspaghetti",
  "Vollmilch, pasteurisiert und sterilisiert",
  "Walnüsse",
  "Wassermelonen",
  "Weichkäse, Vollfettstufe",
  "Weinessig, Balsamico-Essig",
  "Weintrauben",
  "Weissbrot",
  "Weisswein, trocken",
  "Weizenbrot  (Vollkorn)",
  "Weizenmehl  (Typ 450)",
  "Weizenmischbrot",
  "Weizenvollkornmehl",
  "Wienerwürstchen",
  "Wildkaninchen",
  "Zander",
  "Zitronen",
  "Zitronensaft",
  "Zucchini",
  "Zucker, weiss",
  "Zwieback",
  "Zwiebeln",
  "Äpfel",
];

const labels0 = ["Zwiebeln", "Äpfel"];

test("readPRAL", async () => {
  const results = [];

  for (const label of labels) {
    const pral = await getPRALByName(label).catch(() => null);
    results.push([label, pral]);
  }

  writeFileSync(
    "src/pral-lookup.json",
    JSON.stringify(Object.fromEntries(results))
  );
});
