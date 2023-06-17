<script lang="ts">
	import type { BoardType } from "@/services/Api";
	import ReadingListCard from "@/components/ReadingListCard/ReadingListCard.svelte";

	export let data: { board:  BoardType};
</script>

<article class="flex flex-col gap-4">
	<h1>{data.board.name}</h1>
	<main class="flex flex-row gap-8">
		{#each data.board.lists as list}
			<ReadingListCard list={list} />
		{/each}
	</main>
</article>

<style lang="scss">
</style>