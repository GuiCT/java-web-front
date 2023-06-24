<script lang="ts">
	import type { ReadingListEntry } from '@/lib/types';
	import { boardStore } from '@/stores/board';
	import Icon from 'svelte-icons-pack';
	import AiFillDelete from 'svelte-icons-pack/ai/AiFillDelete';

	export let entry: ReadingListEntry;

	function updateEntryName() {
		const res = prompt('Digite o novo nome');
		entry.name = res || entry.name;
		// TODO backend
	}

	function updateEntryDueDate() {
		const res = prompt('Digite a nova data de entrega');
		if (!res) return;

		entry.dueDate = new Date(res) || entry.dueDate;
		// TODO backend
	}

	function deleteEntry() {
		// TODO backend
		boardStore.deleteReadingListEntry(entry);
	}
</script>

<tr>
	<td class="px-8 py-2">
		{#if entry.pictureUrl}
			<img src={entry.pictureUrl} alt="URL inválida" class="w-24 h-auto" />
		{:else}
			Placeholder
		{/if}
	</td>
	<td class="px-8 py-2">
		<span on:click={updateEntryName}>{entry.name}</span>
	</td>
	<td class="px-8 py-2">
		<span>{entry.createdAt.toLocaleDateString()}</span>
	</td>
	<td class="px-8 py-2">
		{#if entry.dueDate}
			<span on:click={updateEntryDueDate}>{entry.dueDate.toLocaleDateString()}</span>
		{/if}
	</td>
	<td><button on:click={deleteEntry}><Icon src={AiFillDelete} /></button></td>
</tr>
