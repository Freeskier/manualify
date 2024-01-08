<script lang="ts">
  import { stepsStore } from "../steps-store.svelte.ts";

  type IProps = {
    onExpand: () => void;
  };
  
  const { onExpand } = $props<IProps>();
  let str = $state<string[]>([])

  stepsStore.exampleFunc = (s) => {
    str.push(s)
  }
</script>

<button on:click={onExpand}>Expand</button>
{#each str as s}
  <h3>{s}</h3>
{/each}
