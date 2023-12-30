<script lang="ts">
  import ManualStep from "./manual-step.svelte";
  import { stepsStore } from "./steps-store.svelte.ts";
  let { steps, addNewStep } = stepsStore;
</script>

<div class="manual__container">
  {#each steps as step (step.id)}
    <ManualStep {...step} />
  {/each}
  <button on:click={addNewStep}>Add Step</button>
</div>

<style>
  .manual__container {
    max-width: 1000px;
    margin: 0 auto;
    width: 100%;
    display: grid;
    gap: 0.5rem;
    margin-top: 10rem;
  }
</style>
