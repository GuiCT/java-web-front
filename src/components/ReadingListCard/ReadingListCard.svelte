<script lang="ts">
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import AiFillDelete from 'svelte-icons-pack/ai/AiFillDelete';
	import AiFillEdit from 'svelte-icons-pack/ai/AiFillEdit';
	import CardItem from './CardItem.svelte';
	import type { ReadingList } from '@/lib/types';
	import { boardStore } from '@/stores/board';
	import { ValidationType, validateListName } from '@/lib/validations';

	export let list: ReadingList;

	$: entriesSortedByDueDate = list.readingListEntries.sort((a, b) => {
		if (a.dueDate && b.dueDate) {
			return a.dueDate.getTime() - b.dueDate.getTime();
		}

		if (a.dueDate) return -1;
		if (b.dueDate) return 1;
		return a.updatedAt.getTime() - b.updatedAt.getTime();
	});

	function deleteList() {
		boardStore.deleteReadingList(list);
	}

	function updateList() {
		debugger;
		const res = prompt('Digite novo nome da lista');
		if (!res) return;
		if (validateListName(res) !== ValidationType.VALID) {
			alert('Nome de lista deve ter entre 3 e 25 caracteres');
			return;
		}

		const newList = { ...list, name: res };
		boardStore.updateReadingList(newList);
	}

	function addListEntry() {
		const res = prompt('Digite o nome do livro');
		if (!res) return;

		boardStore.createReadingListEntry(list.id, res);
	}
</script>

<article
	class="flex flex-col gap-3 min-w-[16rem] py-3 px-4 border-2 border-neutral-200 rounded-md shadow-md"
>
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
		{#if entriesSortedByDueDate.length > 0}
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
					{#each entriesSortedByDueDate as listEntry}
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
