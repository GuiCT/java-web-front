<script>
	import '../app.css';
</script>

<main class="p-4">
	<slot />
</main>

<style lang="scss">
	:root {
		--primary: #000000;
	}

	:global(html) {
		background-color: #cccccc;
		color: var(--primary);
	}
</style>
