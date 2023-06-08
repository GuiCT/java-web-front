<script lang="ts">
	import { ValidationType } from '@/lib/validations';

	export let label: string | undefined = undefined;
	export let value: string;
	export let type: string;
	export let required: boolean = false;
	export let validator: ((value: string) => ValidationType) | null = null;
  export let errorMap: Map<ValidationType, string>;

	function typeAction(node: HTMLInputElement) {
		node.type = type;
	}

	$: status = validator ? validator(value) : ValidationType.VALID;
	$: invalid = status !== ValidationType.VALID;
</script>

<div class="flex flex-col gap-2 w-full">
	{#if label}
		<label class="text-white" for="{label}Input">{label}</label>
	{/if}
	<input
		class="rounded-md p-2"
		class:invalid
		name={label}
		id="{label}Input"
		{required}
		bind:value
		use:typeAction
	/>
	{#if invalid}
		<p class="error text-xs">{errorMap.get(status)}</p>
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
