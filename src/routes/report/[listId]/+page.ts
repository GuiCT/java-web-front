import { jwtStore } from '@/stores/jwt';
import { getReadingLists, getUser } from '@/services/Api';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { boardStore } from '@/stores/board';
import { hydrateListEntry } from '@/lib/utils';
import type { ReadingList } from '@/lib/types';

export const ssr = false;

export async function load() {
	const tokenFromStore = get(jwtStore);
	if (!tokenFromStore) {
		alert('Usuário não logado');
		throw redirect(308, '/signIn');
	}

	const [successUser, user] = await getUser();
	const [successReadingLists, userLists] = await getReadingLists();

	if (!successUser || !successReadingLists) {
		alert('Erro ao carregar dados do usuário');
		throw redirect(308, '/signIn');
	}

	const userListsMapped = userLists.map((list) => {
		const newList: ReadingList = {
			id: list.id,
			name: list.name,
			user: list.user,
			readingListEntries: list.readingListEntries.map((entry) => hydrateListEntry(list.id, entry))
		};
		return newList;
	});

	boardStore.set({
		userName: user.name,
		userLists: userListsMapped
	});
}
