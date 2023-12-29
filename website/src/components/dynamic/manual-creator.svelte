<script lang="ts">
  import ManualStep from "./manual-step.svelte";
  import { stepsStore } from "./steps-store.svelte.ts";
  import type { ManualComponent } from "../../global/types";
  const stepStore = stepsStore();
</script>

<div class="manual__container">
  {#each stepStore.steps as step}
    <ManualStep 
      {...step} 
      toggleOpen={() => stepStore.toggleOpen(step.id)} 
      updateComponents={(newComponents: ManualComponent[]) => stepStore.updateComponents(newComponents, step.id)} />
  {/each}
  <button on:click={stepStore.addNewStep}>Add Step</button>
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
