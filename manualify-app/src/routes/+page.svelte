<script lang="ts">
	import Editor from '$lib/editor.svelte';
	import { getContext, setContext } from 'svelte';

	console.log('Hello from the page component');
	setContext('key', 'value');

	let { data } = $props();

	let arr = [1, 2, 3, 4, 5];
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

{#each arr as item}
	<p>{item}</p>
{/each}
<h2>{getContext('key')}</h2>
{@html data.hat}
