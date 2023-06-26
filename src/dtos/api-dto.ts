import type { ReadingList, ReadingListEntry } from '@/lib/types';

export type SignUpBody = {
	name: string;
	email: string;
	password: string;
};

export type SignUpResponse = {
	token: string;
};

export type ResponseError = {
	error: string;
};

export type SignInBody = {
	email: string;
	password: string;
};

export type SignInResponse = SignUpResponse;

export type ReadingListEntryResponse = {
	id: string;
	name: string;
	pictureUrl: string | null;
	dueDate: string | null;
	createdAt: string;
	updatedAt: string;
};

export type ReadingListResponse = Omit<ReadingList, 'readingListEntries'> & {
	readingListEntries: ReadingListEntryResponse[];
};
