<script lang="ts">
	import { ValidationType } from '@/lib/validations';

	export let label: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;
	export let value: string;
	export let type: string;
	export let required: boolean = false;
	export let validator: ((value: string) => ValidationType) | undefined = undefined;
	export let errorMap: Map<ValidationType, string> | undefined = undefined;

	function typeAction(node: HTMLInputElement) {
		node.type = type;
	}

	$: status = validator ? validator(value) : ValidationType.VALID;
	$: invalid = validator ? status !== ValidationType.VALID : false;
</script>

<div class="flex flex-col gap-2 w-full">
	{#if label}
		<label for="{label}Input" class=" text-lg">{label}</label>
	{/if}
	<input
		class="rounded-md p-2 outline-none"
		class:invalid
		name={label}
		id="{label}Input"
		{placeholder}
		{required}
		bind:value
		use:typeAction
	/>
	{#if invalid && errorMap}
		<p class="error text-md">{errorMap.get(status)}</p>
	{/if}
</div>

<style lang="scss">
	.invalid {
		border: 1px solid red;
	}

	.error {
		color: red;
	}
</style>
