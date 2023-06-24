import type { ReadingList, ReadingListEntry } from '@/lib/types';
import { writable } from 'svelte/store';
import * as Api from '@/services/Api';

export const { set, subscribe, update } = writable<{
	userName: string;
	userLists: ReadingList[];
}>();

function createReadingList(newList: ReadingList) {
	update((board) => ({
		...board,
		userLists: [...board.userLists, newList]
	}));
}

async function deleteReadingList(list: ReadingList) {
	const [success, error] = await Api.deleteReadingList(list.id);
	if (success) {
		update((board) => ({
			...board,
			userLists: board.userLists.filter((l) => l.id !== list.id)
		}));
	} else {
		alert(error);
	}
}

function createReadingListEntry(newEntry: ReadingListEntry) {
	update((board) => ({
		...board,
		userLists: board.userLists.map((list) => {
			if (list.id === newEntry.readingListId) {
				list.entries = [...list.entries, newEntry];
			}
			return list;
		})
	}));
}

function deleteReadingListEntry(entry: ReadingListEntry) {
	update((board) => ({
		...board,
		userLists: board.userLists.map((list) => {
			if (list.id === entry.readingListId) {
				list.entries = list.entries.filter((entry) => entry.id !== entry.id);
			}
			return list;
		})
	}));
}

export const boardStore = {
	set,
	subscribe,
	update,
	createReadingList,
	deleteReadingList,
	createReadingListEntry,
	deleteReadingListEntry
};
