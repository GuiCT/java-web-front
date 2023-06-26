<script lang="ts">
	import ReadingListCard from '@/components/ReadingListCard/ReadingListCard.svelte';
	import { ValidationType, validateListName } from '@/lib/validations';
	import { boardStore } from '@/stores/board';

	$: userListsSortedByName = $boardStore.userLists.sort((a, b) => a.name.localeCompare(b.name));

	function createReadingList() {
		const res = prompt('Digite o nome da lista');
		if (!res) return;
		if (validateListName(res) !== ValidationType.VALID) {
			alert('Nome de lista deve ter entre 3 e 25 caracteres');
			return;
		}

		boardStore.createReadingList(res);
	}
</script>

<head>
	<title>Board de {$boardStore.userName}</title>
</head>
<article class="flex flex-col gap-4">
	<header class="flex flex-row gap-4">
		<h1>{$boardStore.userName}</h1>
		<button on:click={createReadingList}>+</button>
	</header>
	<main class="flex flex-row flex-wrap justify-between row-gap-2">
		{#each userListsSortedByName as list}
			<ReadingListCard {list} />
		{/each}
	</main>
</article>

<style lang="scss">
	.row-gap-2 {
		row-gap: 2rem;
	}
</style>
