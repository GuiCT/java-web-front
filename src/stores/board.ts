import type { ReadingList, ReadingListEntry } from '@/lib/types';
import { writable } from 'svelte/store';
import * as Api from '@/services/Api';

export const { set, subscribe, update } = writable<{
	userName: string;
	userLists: ReadingList[];
}>();

async function createReadingList(name: string) {
	const [success, retVal] = await Api.createReadingList(name);
	if (success) {
		update((board) => ({
			...board,
			userLists: [...board.userLists, retVal]
		}));
	} else {
		alert(retVal);
	}
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

async function updateReadingList(newList: ReadingList) {
	const [success, error] = await Api.updateReadingList(newList);
	if (success) {
		update((board) => ({
			...board,
			userLists: board.userLists.map((list) => {
				if (list.id === newList.id) {
					return newList;
				}
				return list;
			})
		}));
	} else {
		alert(error);
	}
}

async function createReadingListEntry(readingListId: string, entryName: string) {
	const [success, retVal] = await Api.createReadingListEntry(readingListId, entryName);
	if (success) {
		update((board) => ({
			...board,
			userLists: board.userLists.map((list) => {
				if (list.id === retVal.readingListId) {
					list.entries = [...list.entries, retVal];
				}
				return list;
			})
		}));
	} else {
		alert(retVal);
	}
}

async function deleteReadingListEntry(entry: ReadingListEntry) {
	const [success, errorMessage] = await Api.deleteReadingListEntry(entry);
	if (success) {
		update((board) => ({
			...board,
			userLists: board.userLists.map((list) => {
				if (list.id === entry.readingListId) {
					list.entries = list.entries.filter((entry) => entry.id !== entry.id);
				}
				return list;
			})
		}));
	} else {
		alert(errorMessage);
	}
}

async function updateReadingListEntry(entry: ReadingListEntry) {
	const [success, retVal] = await Api.updateReadingListEntry(entry);
	if (success) {
		update((board) => ({
			...board,
			userLists: board.userLists.map((list) => {
				if (list.id === entry.readingListId) {
					list.entries = list.entries.map((entry) => {
						if (entry.id === retVal.id) {
							return retVal;
						}
						return entry;
					});
				}
				return list;
			})
		}));
	} else {
		alert(retVal);
	}
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
