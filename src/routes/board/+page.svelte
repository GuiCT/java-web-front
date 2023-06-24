<script lang="ts">
	import ReadingListCard from '@/components/ReadingListCard/ReadingListCard.svelte';
	import type { ReadingList } from '@/lib/types';
	import { boardStore } from '@/stores/board';

	function createReadingList() {
		const res = prompt('Digite o nome da lista');
		if (!res) return;

		const newReadingList: ReadingList = {
			name: res,
			id: 'a',
			entries: []
		};
		// Chamada backend
		boardStore.createReadingList(newReadingList);
	}
</script>

<article class="flex flex-col gap-4">
	<header class="flex flex-row gap-4">
		<h1>{$boardStore.userName}</h1>
		<button on:click={createReadingList}>+</button>
	</header>
	<main class="flex flex-row justify-around flex-wrap row-gap-4">
		{#each $boardStore.userLists as list}
			<ReadingListCard {list} />
		{/each}
	</main>
</article>

<style lang="scss">
	.row-gap-4 {
		row-gap: 4rem;
	}
</style>
