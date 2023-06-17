<script lang="ts">
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import AiFillDelete from 'svelte-icons-pack/ai/AiFillDelete';
	import { addListEntry, type ListType } from '@/services/Api';
	import CardItem from './CardItem.svelte';

	export let list: ListType;
</script>

<article class="flex flex-col gap-3 min-w-[16rem] bg-white py-3 px-4 rounded-md shadow">
	<header class="flex flex-row gap-2">
		<h1 class="flex-1">{list.name}</h1>
		<button>
			<Icon src={AiFillDelete} />
		</button>
	</header>
	<main class="flex flex-col gap-1">
		{#each list.books as listItem}
			<CardItem entry={listItem} />
		{/each}
	</main>
	<button on:click={() => addListEntry(list.id)}>+</button>
</article>
