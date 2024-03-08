<script lang="ts">
  import { routes, notFound } from "@/config/router";
  import { updateRouter, currentRoute } from "@/stores";

  window.addEventListener("popstate", () => updateRouter.set(true));

  function finishUpdate(newRoute: any) {
    currentRoute.set(newRoute);
    updateRouter.set(false);
  }
</script>

{#if $updateRouter}
  {#each routes as route}
    {#if window.location.pathname === route.path}
      {finishUpdate(route.component)}
    {/if}
  {/each}

  {finishUpdate(notFound)}
{/if}

<svelte:component this={$currentRoute} />
