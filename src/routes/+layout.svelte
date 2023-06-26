<script>
	import '../app.css';
</script>

<main class="">
	<slot />
</main>

<style lang="scss">
	:root {
		--primary: #000000;
	}

	:global(html) {
		color: var(--primary);
	}
</style>
