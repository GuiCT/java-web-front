<script lang="ts">
	import {
		emailErrorMap,
		passwordErrorMap,
		validateEmail,
		validatePassword
	} from '@/lib/validations';
	import FormInput from '@/components/FormInput.svelte';
	import { doSignUp } from '@/services/Api';

	let name = '';
	let email = '';
	let password = '';

	async function makeRequest() {
		const [success, error] = await doSignUp({
			name,
			email,
			password
		});
		if (success) {
			window.location.href = '/board';
		} else {
			alert(error);
		}
	}
</script>

<head>
	<title>Realizar cadastro</title>
</head>

<form
	class="flex flex-col items-center w-80 mx-auto justify-center"
	on:submit|preventDefault={makeRequest}
>
	<FormInput label="Nome" type="text" placeholder="Nome completo" required bind:value={name} />
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

	
	<button class="w-full py-2 mt-4 px-10 rounded-md from-yellow-400 to-orange-400 bg-gradient-to-r text-white
	">Registrar</button>
	<a href="/signIn" class="text-lg py-5">Já tem uma conta? Faça login aqui!</a>
</form>
