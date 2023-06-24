<script lang="ts">
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import AiFillDelete from 'svelte-icons-pack/ai/AiFillDelete';
	import AiFillEdit from 'svelte-icons-pack/ai/AiFillEdit';
	import CardItem from './CardItem.svelte';
	import type { ReadingList, ReadingListEntry } from '@/lib/types';
	import { boardStore } from '@/stores/board';

	export let list: ReadingList;

	function deleteList() {
		boardStore.deleteReadingList(list);
	}

	function updateList() {
		const res = prompt('Digite novo nome da lista');
		if (!res) return;
		list.name = res;
		// TODO chamada backend
	}

	function addListEntry() {
		const res = prompt('Digite o nome do livro');
		if (!res) return;

		const newListEntry: ReadingListEntry = {
			name: res,
			readingListId: list.id,
			id: 'a',
			createdAt: new Date(),
			dueDate: new Date('2023-06-30'),
			pictureUrl:
				'https://odgraph.com.br/wp-content/uploads/2020/03/maquete-de-uma-capa-de-livro_117023-1303.jpg'
		};

		boardStore.createReadingListEntry(newListEntry);
		// TODO chamada backend
	}
</script>

<article class="flex flex-col gap-3 min-w-[16rem] bg-white py-3 px-4 rounded-md shadow">
	<header class="flex flex-row gap-2">
		<h1 class="flex-1">{list.name}</h1>
		<button on:click={updateList}>
			<Icon src={AiFillEdit} />
		</button>
		<button on:click={deleteList}>
			<Icon src={AiFillDelete} />
		</button>
	</header>
	<main class="flex flex-col gap-1">
		{#if list.entries.length > 0}
			<table class="table-auto">
				<thead>
					<tr>
						<th>Capa</th>
						<th>Nome</th>
						<th>Início</th>
						<th>Prazo</th>
					</tr>
				</thead>
				<tbody>
					{#each list.entries as listEntry}
						<CardItem entry={listEntry} />
					{/each}
				</tbody>
			</table>
		{:else}
			<span class="text-neutral-700">Nenhum livro adicionado</span>
		{/if}
	</main>
	<button on:click={addListEntry}>+</button>
</article>
