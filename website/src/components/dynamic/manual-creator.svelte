<script lang="ts">
  import { flip } from "svelte/animate";
  import ManualStep from "./manual-step.svelte";
  import { stepsStore } from "./steps-store.svelte.ts";
</script>

<div class="manual__container">
  {#each stepsStore.steps as step (step.id)}
    <div animate:flip={{ duration: 500 }}>
      <ManualStep {...step} />
    </div>
  {/each}
  <button on:click={stepsStore.addNewStep}>Add Step</button>
</div>

<style>
  .manual__container {
    max-width: 1000px;
    margin: 0 auto;
    width: 100%;
    display: grid;
    margin-top: 10rem;
  }
</style>
