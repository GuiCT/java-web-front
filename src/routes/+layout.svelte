<script>
  import "../app.css";
</script>

<style lang="scss">
  :root {
    --primary: #000000;
  }

  :global(html) {
    background-color: #CCCCCC;
    color: var(--primary);
  }
</style>

<main class="p-4">
  <slot />
</main>