<script lang="ts">
  import ManualStep from "./manual-step.svelte";
  import { stepsStore } from "./steps-store.svelte.ts";
</script>

<div class="manual__container">
  {#each stepsStore.steps as step}
    <ManualStep {...step} />
  {/each}
  <button on:click={stepsStore.addNewStep}>Add Step</button>
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
