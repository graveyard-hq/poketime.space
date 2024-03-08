<script lang="ts">
  import XMark from "$lib/components/icons/XMark.svelte";
  import PokeTime from "$lib/components/icons/PokeTime.svelte";

  export let zIndex = 5;
  export let title = "Modal";
  export let close: (() => void) | (() => never);
</script>

<div
  class="absolute-center border-2 border-zinc-500 rounded-lg p-3"
  style="z-index: {zIndex}"
>
  <div class="flex justify-between items-center mb-2">
    <div class="inline-flex text-zinc-600">
      <PokeTime class="mr-1" />
      <p>{title}</p>
    </div>

    <button on:click={close} class="cursor-pointer">
      <XMark class="text-zinc-600" />
    </button>
  </div>
  <div class="border border-zinc-500 w-full mb-4" />

  <slot />
</div>
