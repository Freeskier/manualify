<script lang="ts">
  import { eventsStore } from "../events-store.svelte.ts";

  type IProps = {
    onExpand: () => void;
  };

  const { onExpand } = $props<IProps>();
  let str = $state<string[]>([]);

  eventsStore.subscribe('test1', e => {
    console.log(e)
  })

</script>

<button on:click={onExpand}>Expand</button>

<button on:pointerdown|preventDefault on:click|preventDefault>prevent</button>

<style>
  div:focus,
  div:focus-within {
    outline: 1px solid var(--clr-red-400);
  }
</style>
