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
