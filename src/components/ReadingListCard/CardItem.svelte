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

		boardStore.updateReadingListEntry({
			...entry,
			pictureUrl: res
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

		let newDate: Date | null = null;

		if (res) {
			const dateTime = DateTime.fromFormat(res, 'dd/MM/yyyy');
			if (!dateTime.isValid) {
				alert('Data inválida');
				return;
			}
			newDate = dateTime.toJSDate();
		} else {
			newDate = null;
		}

		boardStore.updateReadingListEntry({
			...entry,
			dueDate: newDate
		});
	}

	function deleteEntry() {
		boardStore.deleteReadingListEntry(entry);
	}
</script>

<tr>
	<td class="px-8 py-2">
		<img
			src={entry.pictureUrl ? entry.pictureUrl : 'placeholder.png'}
			alt={entry.pictureUrl ? 'URL inválida' : 'Placeholder'}
			class="w-20 h-16"
			on:click={updateEntryPictureURL}
		/>
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
