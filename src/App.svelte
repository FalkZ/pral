<script lang="ts">
  import ListItem from "./ListItem.svelte";
  import avData from "../gen/out/av.json";
  import usdaData from "../gen/out/usda.json";

  import Fuse from "fuse.js";
  import { IconSearch } from "@tabler/icons-svelte";

  const pralLookup = [...avData, ...usdaData].sort((a, b) =>
    a.label.localeCompare(b.label)
  );

  const fuse = new Fuse(pralLookup, {
    keys: ["label"],
    threshold: 0.4,
  });

  let search = "";

  $: results = fuse.search(search);
</script>

<main class="max-w-[36rem] mx-auto">
  <div class="flex justify-center -space-x-14 pt-6">
    <div class="mix-blend-lighten bg-teal-400/100 size-10 rounded-full"></div>
    <div class="mix-blend-lighten bg-pink-400/100 size-10 rounded-full"></div>
  </div>
  <h1
    class="font-bold tracking-tight text-5xl text-center pt-2 pb-6 text-slate-200"
  >
    PRAL Values
  </h1>
  <div class="sticky top-0 w-full z-10 block">
    <label
      class="flex flex-row items-center rounded-sm bg-slate-800/30 focus-within:bg-slate-700/30 backdrop-blur-xl pl-4 focus-within:shadow-slate-600/20 shadow-sm focus-within:shadow transition-all"
    >
      <IconSearch class="text-slate-400 w-5" />
      <input
        class="w-full text-lg tracking-wide px-4 py-4 bg-transparent outline-none"
        bind:value={search}
        placeholder="Search"
      />
    </label>
  </div>

  <div class="flex flex-col flex-grow min-h-screen p-0.5">
    {#if search}
      {#each results as result}
        <ListItem item={result.item} />
      {/each}
    {:else}
      {#each pralLookup as item}
        <ListItem {item} />
      {/each}
    {/if}
  </div>
</main>
