<script lang="ts">
  import { eventsStore } from "../events-store.svelte.ts";

  type IProps = {
    onExpand: () => void;
  };

  const { onExpand } = $props<IProps>();
  let str = $state<string[]>([]);

  eventsStore.subscribe = {
    type: "component-mention",
    callback: (message) => {
      str.push(message);
    },
  };
  // function name(e) {
  //   e.preventDefault()
  //   console.log('hi')
  // }
</script>

<button on:click={onExpand}>Expand</button>

<button on:pointerdown|preventDefault on:click|preventDefault>prevent</button>

<style>
  div:focus,
  div:focus-within {
    outline: 1px solid var(--clr-red-400);
  }
</style>
