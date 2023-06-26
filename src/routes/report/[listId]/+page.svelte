<script lang="ts">
	import { page } from '$app/stores';
	import { formatDate } from '@/lib/utils';
	import { boardStore } from '@/stores/board';
	import { DateTime } from 'luxon';

	const currentDay = DateTime.now();

	$: list = $boardStore.userLists.find((l) => l.id === $page.params.listId);
	$: shownEntries = list?.readingListEntries.filter((entry) => {
		return (
			entry.read &&
			DateTime.fromJSDate(entry.updatedAt).diff(currentDay, 'day').valueOf() < selectedDays
		);
	});
	let selectedDays: number;
</script>

<head>
	<title>Relatório</title>
</head>
<main class="flex flex-col items-center gap-4">
	<header class="flex flex-col items-center gap-2">
		<h1 class="text-2xl">Relatório da lista: {list?.name}</h1>
		<div class="flex flex-row gap-2">
			<label for="lastDays">Quantidade de dias</label>
			<select name="lastDays" class="px-2" bind:value={selectedDays}>
				<option value="7">7 dias</option>
				<option value="15">15 dias</option>
				<option value="30">30 dias</option>
			</select>
		</div>
	</header>
	<article>
		<thead>
			<tr>
				<th class="px-8 py-2 text-center">Nome</th>
				<th class="px-8 py-2 text-center">Data de início</th>
				<th class="px-8 py-2 text-center">Data de término</th>
			</tr>
		</thead>
		<tbody>
			{#each shownEntries || [] as entry}
				<tr>
					<td class="px-8 py-2 text-center">{entry.name}</td>
					<td class="px-8 py-2 text-center">{formatDate(entry.createdAt)}</td>
					<td class="px-8 py-2 text-center">{formatDate(entry.updatedAt)}</td>
				</tr>
			{/each}
		</tbody>
	</article>
</main>
