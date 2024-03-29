<script lang="ts">
  import { flip } from "svelte/animate";
  import ManualStep from "./manual-step.svelte";
  import { stepsStore } from "./steps-store.svelte.ts";
  import TagsContainer from "./manual-tags/tags-container.svelte";
  import ManualCommentsContainer from "./manual-comments/manual-comments-container.svelte";
  import ManualNavigation from "./manual-navigation/manual-navigation.svelte";
  import ManualControls from "./manual-controls.svelte";
</script>

<div class="manual__container">
  <nav class="manual__navigation">
    <ManualNavigation />
  </nav>
  <div class="manual__content">
    <div class="manual__content-wrapper">
      <TagsContainer />
      <div class="manual__content-steps">
        {#each stepsStore.steps as step (step.id)}
          <div animate:flip={{ duration: 500 }}>
            <ManualStep {...step} bind:step />
          </div>
        {/each}
        <button on:click={stepsStore.addNewStep}>Add Step</button>
      </div>
    </div>
    <ManualControls />
  </div>
  <aside class="manual__comments">
    <ManualCommentsContainer />
  </aside>
</div>

<style>
  .manual__container {
    width: 100%;
    display: grid;
    grid-template-columns: 20rem 1fr auto;
    flex: 1;
    transition: grid-template-columns 300ms ease-in-out;
  }

  :global(
      .manual__container:has(.manual__comments.comments__container.expand)
    ) {
    grid-template-columns: 20rem 1fr 30rem;
  }

  .manual__comments,
  .manual__navigation {
    position: sticky;
    top: var(--header-height);
    align-self: start;
    height: calc(100vh - var(--header-height));
    background-color: var(--clr-neutral-200);
  }

  .manual__navigation {
    border-right: 2px solid var(--clr-neutral-400);
  }

  .manual__comments {
    border-left: 2px solid var(--clr-neutral-400);
  }
  .manual__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: center;
    width: 100%;
  }

  .manual__content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 70rem;
    padding-inline: 1rem;
    width: 100%;
  }
  .manual__content-steps {
    display: grid;
    width: 100%;
  }

  @media (max-width: 1200px) {
    .manual__container {
      grid-template-columns: 18rem 1fr;
    }

    .manual__comments {
      grid-column: span 2;
    }
  }
</style>
