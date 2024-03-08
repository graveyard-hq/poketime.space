<script lang="ts">
  let strokeWidth = 1.5;
  let className = "";

  export { className as class, strokeWidth };
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width={strokeWidth}
  stroke="currentColor"
  class="w-6 h-6{className ? ` ${className}` : ''}"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
  />
</svg>
