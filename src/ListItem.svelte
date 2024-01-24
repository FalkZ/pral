<script lang="ts">
  import { IconCaretUp } from "@tabler/icons-svelte";

  export let item: { label: string; pral: number };

  const lookupBGTeal = {
    0: "bg-teal-400/0",
    1: "bg-teal-400/10",
    2: "bg-teal-400/20",
    3: "bg-teal-400/30",
    4: "bg-teal-400/40",
    5: "bg-teal-400/50",
    6: "bg-teal-400/60",
    7: "bg-teal-400/70",
    8: "bg-teal-400/80",
    9: "bg-teal-400/90",
    10: "bg-teal-400/100",
  };

  const lookupBGPink = {
    0: "bg-pink-400/0",
    1: "bg-pink-400/10",
    2: "bg-pink-400/20",
    3: "bg-pink-400/30",
    4: "bg-pink-400/40",
    5: "bg-pink-400/50",
    6: "bg-pink-400/60",
    7: "bg-pink-400/70",
    8: "bg-pink-400/80",
    9: "bg-pink-400/90",
    10: "bg-pink-400/100",
  };
</script>

<div
  class="flex flex-row items-center place-content-between text-lg tracking-wide py-1 px-4 even:bg-slate-700/20"
>
  <div>{item.label}</div>

  <div
    style:--tw-shadow-opacity={Math.abs(item.pral) / 20}
    class="bg-slate-800 rounded-sm flex-shrink-0 overflow-clip shadow-sm {item.pral >
    9
      ? 'shadow-pink-400/80'
      : item.pral < -9
        ? 'shadow-teal-400/80'
        : ''}"
  >
    <div
      style:--tw-bg-opacity={Math.abs(item.pral) / 20}
      class="block relative w-24 text-right py-0.5 px-2 pb-2 text-slate-200"
      class:text-slate-800={Math.abs(item.pral) > 18}
      class:bg-pink-400={item.pral > 0}
      class:bg-teal-400={item.pral < 0}
    >
      <IconCaretUp
        class="absolute -bottom-1 mix-blend-multipy"
        style="left: {(item.pral / 21.5) * (24 * 0.1) + 24 * 0.1}rem"
      ></IconCaretUp>
      {Math.round(item.pral * 10) / 10}
    </div>
  </div>
</div>
