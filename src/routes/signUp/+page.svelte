<script lang="ts">
	import {
		emailErrorMap,
		passwordErrorMap,
		validateEmail,
		validatePassword
	} from '@/lib/validations';
	import FormInput from '@/components/FormInput.svelte';
	import { doSignUp } from '@/services/Api';
	import { redirect } from '@sveltejs/kit';

	let name = '';
	let email = '';
	let password = '';

	async function makeRequest() {
		const result = await doSignUp({
			name,
			email,
			password
		});
		if (typeof result === 'string') {
			alert(`Error: ${result}`);
		} else {
			alert('Cadastro realizado com sucesso!');
			window.location.href = '/board';
		}
	}
</script>

<head>
	<title>Realizar cadastro</title>
</head>

<form
	class="flex flex-col items-end w-80 mx-auto my-10 justify-center gap-4"
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

	<button class="w-full py-1 px-10 bg-white rounded-md">Registrar</button>
</form>
