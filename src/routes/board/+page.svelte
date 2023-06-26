<script lang="ts">
	import ReadingListCard from '@/components/ReadingListCard/ReadingListCard.svelte';
	import { ValidationType, validateListName } from '@/lib/validations';
	import { boardStore } from '@/stores/board';
	import Icon from 'svelte-icons-pack';
	import CgAdd from 'svelte-icons-pack/cg/CgAdd';
	import AiOutlineLogout from 'svelte-icons-pack/ai/AiOutlineLogout';
	import { jwtStore } from '@/stores/jwt';

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

	function greeting() {
		const hour = new Date().getHours();
		if (hour >= 0 && hour < 12) return 'Bom dia';
		if (hour >= 12 && hour < 18) return 'Boa tarde';
		return 'Boa noite';
	}

	function logout() {
		jwtStore.out();
		window.location.href = '/';
	}
</script>

<head>
	<title>Board de {$boardStore.userName}</title>
</head>
<article class="flex flex-col gap-4 w-full">
	<header class="flex justify-between gap-4">
		<h1>{greeting()}, <strong>{$boardStore.userName}!</strong></h1>
		<button on:click={createReadingList}>
			<Icon src={CgAdd} size="24px" />
		</button>
		<button on:click={logout}>
			<Icon src={AiOutlineLogout} size="24px" />
		</button>
	</header>
	<main class="flex flex-row flex-wrap justify-center gap-4 row-gap-2">
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
