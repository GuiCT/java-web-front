import { jwtStore } from '@/stores/jwt';
import { getReadingLists, getUserName } from '@/services/Api';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { boardStore } from '@/stores/board';

export const ssr = false;

export async function load() {
	const tokenFromStore = get(jwtStore);
	if (!tokenFromStore) {
		alert('Usuário não logado');
		throw redirect(308, '/signIn');
	}

	const [successUserName, userName] = await getUserName();
	const [successReadingLists, userLists] = await getReadingLists();

	if (!successUserName || !successReadingLists) {
		alert('Erro ao carregar dados do usuário');
		throw redirect(308, '/signIn');
	}

	boardStore.set({
		userName,
		userLists
	});
}
