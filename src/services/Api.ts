/*
===== PLACEHOLDERS =====
*/
export const DEFAULT_ENTRY = {
	id: 'uuid_entry',
	name: 'Livro específico',
	startDate: new Date('2014-07-14')
};

export const DEFAULT_LIST = {
	id: 'uuid_list',
	name: 'Lista de leitura',
	books: [{ ...DEFAULT_ENTRY }, { ...DEFAULT_ENTRY }]
};

export const DEFAULT_BOARD = {
	id: 'uuid_board',
	name: 'Board de leitura',
	lists: [{ ...DEFAULT_LIST }, { ...DEFAULT_LIST }]
};

export type BoardType = typeof DEFAULT_BOARD;
export type ListType = typeof DEFAULT_LIST;
export type EntryType = typeof DEFAULT_ENTRY;

/*
===== CRUD =====
*/
export function addListEntry(listId: string) {
	alert(`Adding entry to list with id ${listId}`);
}

export function removeListEntry(entryId: string) {
	alert(`Removing entry with id ${entryId}`);
}
