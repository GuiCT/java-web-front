<script lang="ts">
	import {
		emailErrorMap,
		passwordErrorMap,
		validateEmail,
		validatePassword
	} from '@/lib/validations';
	import FormInput from '@/components/FormInput.svelte';
	import { doSignIn } from '@/services/Api';

	let email = '';
	let password = '';

	async function makeRequest() {
		const [success, error] = await doSignIn({
			email,
			password
		});
		if (success) {
			alert('Login realizado com sucesso!');
			window.location.href = '/board';
		} else {
			alert(error);
		}
	}
</script>

<head>
	<title>Realizar login</title>
</head>

<form
	class="flex flex-col items-end w-80 mx-auto my-10 justify-center gap-4"
	on:submit|preventDefault={makeRequest}
>
	<FormInput
		label="Email"
		type="email"
		placeholder="exemplo@dominio.com"
		required
		validator={validateEmail}
		errorMap={emailErrorMap}
		bind:value={email}
	/>
	<FormInput
		label="Senha"
		type="password"
		placeholder="Sua senha aqui"
		required
		validator={validatePassword}
		errorMap={passwordErrorMap}
		bind:value={password}
	/>

	<button class="w-full py-1 px-10 bg-white rounded-md">Login</button>
</form>
