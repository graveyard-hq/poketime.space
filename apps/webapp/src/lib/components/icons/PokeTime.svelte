<script lang="ts">
  let className = "";

  export { className as class, strokeWidth };
</script>

<img
  src="/logo.png"
  alt="PokeTime logo"
  class="w-6 h-6{className ? ` ${className}` : ''}"
/>
