<script>
  import IconButton from "../controls/icon-button.svelte";

  let isOpen = $state(false);
</script>

<div class="options__container" class:open={isOpen}>
  <div class="options__heading">
    <IconButton
      onClick={() => (isOpen = !isOpen)}
      icon={"mi:options-vertical"}
      colorHover={"red"}
    />
    <span>options</span>
  </div>
  <div class="options__wrapper">
    <div class="options__list">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </div>
  </div>
  {#if isOpen}
    <div class="overlay" on:click={() => (isOpen = false)} aria-hidden="true" />
  {/if}
</div>

<style>
  .overlay {
    position: fixed;
    inset: 0;
    z-index: -2;
  }

  .options__container {
    --clr-border: var(--clr-red-400);
    --clr-options-bg: var(--clr-neutral-300);
    position: relative;
    z-index: 2;
    isolation: isolate;
    width: 100%;
  }

  .options__container.open {
    width: 150px;
    transition: width 200ms ease-in-out;
  }

  .options__container.open .options__wrapper {
    grid-template-rows: 1fr;
    transition:
      grid-template-rows 300ms ease-in-out 300ms,
      border-color 200ms linear,
      background-color 200ms ease-in-out;
    border-color: var(--clr-border);
    background-color: var(--clr-options-bg);
  }

  .options__heading span {
    overflow: hidden;
    background-color: var(--clr-options-bg);
    text-transform: uppercase;
    font-weight: 600;
    color: var(--clr-neutral-500);
    letter-spacing: 2px;
  }

  .options__heading {
    display: grid;
    grid-template-columns: 2rem 0fr;
    border: 1px solid transparent;
    border-bottom: 0px;
    align-items: center;
  }

  .options__container.open .options__heading {
    grid-template-columns: 2rem 1fr;
    background-color: var(--clr-options-bg);
    transition:
      grid-template-columns 200ms ease-in-out,
      border-color 200ms linear,
      background-color 200ms ease-in-out;
    border-color: var(--clr-border);
  }

  .options__wrapper {
    overflow: hidden;
    position: absolute;
    z-index: -1;
    left: 0;
    top: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: 0fr;
    border: 1px solid transparent;
    border-top: 0px;
  }

  .options__list {
    overflow: hidden;
    width: 100%;
    background-color: var(--clr-options-bg);
  }
</style>
