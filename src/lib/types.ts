export type User = {
	id: string;
	name: string;
	email: string;
};

export type ReadingListEntry = {
	id: string;
	name: string;
	read: boolean,
	pictureUrl: string | null;
	dueDate: Date | null;
	createdAt: Date;
	updatedAt: Date;
	readingListId: string; // Adicionado ao realizar a requisição
};

export type ReadingList = {
	id: string;
	name: string;
	user: User;
	readingListEntries: ReadingListEntry[];
};
