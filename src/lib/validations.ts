export enum ValidationType {
	INVALID_LENGTH,
	INVALID_FORMAT,
	VALID
}

export function validateEmail(email: string) {
	const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	if (!isValid) {
		return ValidationType.INVALID_FORMAT;
	}
	return ValidationType.VALID;
}

export const emailErrorMap = new Map([
	[ValidationType.INVALID_FORMAT, 'Formato de email inválido']
]);

export function validatePassword(password: string) {
	if (password.length < 8) {
		return ValidationType.INVALID_LENGTH;
	}
	const isValid = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(password);
	if (!isValid) {
		return ValidationType.INVALID_FORMAT;
	}
	return ValidationType.VALID;
}

export const passwordErrorMap = new Map([
	[ValidationType.INVALID_LENGTH, 'A senha deve ter no mínimo 8 caracteres'],
	[ValidationType.INVALID_FORMAT, 'A senha deve conter letras maiúsculas, minúsculas e números']
]);

export function validateListName(name: string) {
	if (name.length < 3 || name.length > 50) {
		return ValidationType.INVALID_LENGTH;
	}

	return ValidationType.VALID;
}
