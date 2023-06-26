<script lang="ts">
	import type { ReadingListEntry } from '@/lib/types';
	import { boardStore } from '@/stores/board';
	import Icon from 'svelte-icons-pack';
	import AiFillDelete from 'svelte-icons-pack/ai/AiFillDelete';
	import { DateTime } from 'luxon';
	import { formatDate } from '@/lib/utils';

	export let entry: ReadingListEntry;

	function updateEntryPictureURL() {
		const res = prompt('Digite a URL da imagem');
		if (!res) return;

		boardStore.updateReadingListEntry({
			...entry,
			pictureUrl: res || entry.pictureUrl
		});
	}

	function updateEntryName() {
		const res = prompt('Digite o novo nome');
		if (!res) return;

		boardStore.updateReadingListEntry({
			...entry,
			name: res || entry.name
		});
	}

	function updateEntryDueDate() {
		const res = prompt('Digite a nova data de entrega');
		if (!res) return;

		debugger;
		const dateTime = DateTime.fromFormat(res, 'dd/MM/yyyy');

		if (!dateTime.isValid) {
			alert('Data inválida');
			return;
		} else {
			boardStore.updateReadingListEntry({
				...entry,
				dueDate: dateTime.toJSDate()
			});
		}
	}

	function deleteEntry() {
		boardStore.deleteReadingListEntry(entry);
	}
</script>

<tr>
	<td class="px-8 py-2">
		{#if entry.pictureUrl}
			<img src={entry.pictureUrl} alt="URL inválida" class="w-20 h-16" />
		{:else}
			<img
				src="placeholder.png"
				alt="Placeholder"
				class="w-20 h-16"
				on:click={updateEntryPictureURL}
			/>
		{/if}
	</td>
	<td class="px-8 py-2">
		<span on:click={updateEntryName}>{entry.name}</span>
	</td>
	<td class="px-8 py-2">
		<span>{formatDate(entry.createdAt)}</span>
	</td>
	<td class="px-8 py-2">
		<span on:click={updateEntryDueDate}>{formatDate(entry.dueDate)}</span>
	</td>
	<td><button on:click={deleteEntry}><Icon src={AiFillDelete} /></button></td>
</tr>
