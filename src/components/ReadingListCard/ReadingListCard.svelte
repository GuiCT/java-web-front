<script lang="ts">
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import AiFillDelete from 'svelte-icons-pack/ai/AiFillDelete';
	import AiFillEdit from 'svelte-icons-pack/ai/AiFillEdit';
	import BiSolidReport from 'svelte-icons-pack/bi/BiSolidReport';
	import CardItem from './CardItem.svelte';
	import type { ReadingList, ReadingListEntry } from '@/lib/types';
	import { boardStore } from '@/stores/board';
	import { ValidationType, validateListName } from '@/lib/validations';

	export let list: ReadingList;

	$: entriesSortedByDueDate = list.readingListEntries.sort((a, b) => {
		const compareDueDate = (entryA: ReadingListEntry, entryB: ReadingListEntry) => {
			if (entryA.dueDate && entryB.dueDate) {
				return entryA.dueDate.getTime() - entryB.dueDate.getTime();
			}
			if (entryA.dueDate) return -1;
			if (entryB.dueDate) return 1;
			return entryA.updatedAt.getTime() - entryB.updatedAt.getTime();
		};

		if (a.read && b.read) {
			return compareDueDate(a, b);
		} else if (a.read && !b.read) {
			return 1;
		} else if (!a.read && b.read) {
			return -1;
		} else {
			return compareDueDate(a, b);
		}
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

	function seeReport() {
		window.location.href = `/report/${list.id}`;
	}
</script>

<article
	class="flex flex-col gap-3 min-w-[16rem] py-3 px-4 border-2 rounded-md shadow-md bg-white bg-opacity-90"
>
	<header class="flex flex-row gap-2">
		<button on:click={seeReport}>
			<Icon src={BiSolidReport} />
		</button>	
		<h1 class="flex-1 font-bold text-lg uppercase">{list.name}</h1>
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
						<th>Concluído</th>
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
