import { DEFAULT_BOARD } from '@/services/Api';

type PageParamsType = {
	id: string;
};

export async function load({ id }: PageParamsType) {
	return {
		board: DEFAULT_BOARD
	};
}
