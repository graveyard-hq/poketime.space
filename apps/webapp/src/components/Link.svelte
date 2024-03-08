<script lang="ts">
  import { updateRouter } from "@/stores";

  export let to: string;
</script>

<a
  on:click|preventDefault={() => {
    window.history.pushState(null, "", to);
    updateRouter.set(true);
  }}
  href={to}
  class="text-blue-600 hover:text-blue-500 active:text-blue-700"
>
  <slot />
</a>
