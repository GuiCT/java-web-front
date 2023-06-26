import type { ReadingListEntryResponse } from '@/dtos/api-dto';
import type { ReadingListEntry } from './types';
import { DateTime } from 'luxon';

export function hydrateListEntry(listId: string, entry: ReadingListEntryResponse) {
	const newEntry: ReadingListEntry = {
		id: entry.id,
		name: entry.name,
		pictureUrl: entry.pictureUrl,
		dueDate: entry.dueDate ? new Date(entry.dueDate) : null,
		createdAt: new Date(entry.createdAt),
		updatedAt: new Date(entry.updatedAt),
		readingListId: listId
	};
	return newEntry;
}

export const DATE_FORMAT = 'dd/MM/yyyy';
export function formatDate(date: Date | null) {
	if (!date) return 'Sem data';
	return DateTime.fromJSDate(date).toFormat(DATE_FORMAT);
}
