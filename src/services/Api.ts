import type {
	SignInBody,
	SignInResponse,
	SignUpBody,
	ResponseError,
	SignUpResponse
} from '@/dtos/api-dto';
import { jwtStore } from '@/stores/jwt';
import type { ReadingList } from '@/lib/types';
import axios, { AxiosError, type AxiosResponse } from 'axios';
import { get } from 'svelte/store';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:8080'
});

type AxiosTypedResponse<T> = [true, T] | [false, string];

export async function doSignUp(data: SignUpBody): Promise<AxiosTypedResponse<null>> {
	try {
		const response = (await (
			await axiosInstance.post('/auth/sign-up', data, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
		).data) as SignUpResponse;
		jwtStore.set(response.token);
		return [true, null];
	} catch (e) {
		return dealWithError(e);
	}
}

export async function doSignIn(data: SignInBody): Promise<AxiosTypedResponse<null>> {
	try {
		const response = (await (
			await axiosInstance.post('/auth/sign-in', data)
		).data) as SignInResponse;
		jwtStore.set(response.token);
		return [true, null];
	} catch (e) {
		return dealWithError(e);
	}
}

export async function getUserName(): Promise<AxiosTypedResponse<string>> {
	const tokenFromStore = get(jwtStore);
	if (!tokenFromStore) {
		return [false, 'No JWT token found'];
	}

	try {
		const response = (await (
			await axiosInstance.get('/user/me', {
				headers: {
					Authorization: `Bearer ${tokenFromStore}`
				}
			})
		).data) as { name: string };
		return [true, response.name];
	} catch (e) {
		return dealWithError(e);
	}
}

export async function getReadingLists(): Promise<AxiosTypedResponse<ReadingList[]>> {
	const tokenFromStore = get(jwtStore);
	if (!tokenFromStore) {
		return [false, 'Unauthorized'];
	}
	try {
		const response = (await (
			await axiosInstance.get('/reading-list/', {
				headers: {
					authorization: `Bearer ${tokenFromStore}`
				}
			})
		).data) as ReadingList[];
		return [true, response];
	} catch (e) {
		return dealWithError(e);
	}
}

export async function createReadingList(): Promise<AxiosTypedResponse<null>> {
	const tokenFromStore = get(jwtStore);
	if (!tokenFromStore) {
		return [false, 'Unauthorized'];
	}
	try {
		await axiosInstance.post('/reading-list/', {
			headers: {
				authorization: `Bearer ${tokenFromStore}`
			}
		});
		return [true, null];
	} catch (e) {
		return dealWithError(e);
	}
}

export async function deleteReadingList(id: string): Promise<AxiosTypedResponse<null>> {
	const tokenFromStore = get(jwtStore);
	if (!tokenFromStore) {
		return [false, 'Unauthorized'];
	}
	try {
		await axiosInstance.delete(`/reading-list/${id}`, {
			headers: {
				authorization: `Bearer ${tokenFromStore}`
			}
		});
		return [true, null];
	} catch (e) {
		return dealWithError(e);
	}
}

function dealWithError(e: any): [false, string] {
	const error = e as AxiosError;
	const response = error.response?.data as { error: string };
	return [false, response?.error || 'Erro desconhecido'];
}
