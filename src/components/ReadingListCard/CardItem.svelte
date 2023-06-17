<script lang="ts">
	import { removeListEntry, type EntryType } from "@/services/Api";

    export let entry: EntryType;
</script>

<li class="flex flex-row">
    <span class="flex-1">{entry.name}</span>
    <button on:click={() => removeListEntry(entry.id)}>-</button>
</li>