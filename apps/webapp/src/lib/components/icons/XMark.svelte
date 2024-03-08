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
    d="M6 18 18 6M6 6l12 12"
  />
</svg>
