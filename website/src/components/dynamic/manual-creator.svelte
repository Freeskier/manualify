<script lang="ts">
  import { flip } from "svelte/animate";
  import ManualStep from "./manual-step.svelte";
  import { stepsStore } from "./steps-store.svelte.ts";
  import TagsContainer from "./manual-tags/tags-container.svelte";
  import ManualCommentsContainer from "./manual-comments/manual-comments-container.svelte";
  import ManualNavigation from "./manual-navigation/manual-navigation.svelte";

  let expandCommentSection = $state(false);
</script>

<div class="manual__container" class:expand-comments={expandCommentSection}>
  <nav class="manual__navigation">
    <ManualNavigation />
  </nav>
  <div class="manual__content">
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
  <aside class="manual__comments">
    <ManualCommentsContainer
      onExpand={() => (expandCommentSection = !expandCommentSection)}
    />
  </aside>
</div>

<style>
  .manual__container {
    width: 100%;
    display: grid;
    grid-template-columns: 20rem 1fr 20rem;
    flex: 1;
    transition: grid-template-columns 300ms ease-in-out;
  }

  .manual__container.expand-comments {
    grid-template-columns: 20rem 1fr 30rem;
  }

  .manual__comments,
  .manual__navigation {
    position: sticky;
    top: 0;
    align-self: start;
    height: 100%;
    max-height: 100svh;
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
    gap: 5rem;
    justify-self: center;
  }
  .manual__content-steps {
    display: grid;
    min-width: 1000px;
  }
</style>
