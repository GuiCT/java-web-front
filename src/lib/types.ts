export type ReadingListEntry = {
	id: string;
	name: string;
	createdAt: Date;
	readingListId: string;
} & Partial<{
	dueDate: Date;
	pictureUrl: string;
	updatedAt: Date;
}>;

export type ReadingList = {
	id: string;
	name: string;
	entries: ReadingListEntry[];
};
