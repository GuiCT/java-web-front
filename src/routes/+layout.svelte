<script>
	import '../app.css';
</script>

<main class="p-4 bg-gradient-to-r from-red-400 to-blue-500 h-screen">
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
