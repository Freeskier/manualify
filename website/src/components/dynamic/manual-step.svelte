<script lang="ts">
  import Icon from "@iconify/svelte";

  type StepState = "editing" | "important" | "done";

  export let index: number;
  export let title: string;
  export let state: StepState = "editing";

  let isOpen: boolean = true;

  function onClick() {
    isOpen = !isOpen;
  }
</script>

<div
  class="manual__step-container"
  class:expanded={isOpen}
  class:done={state === "done"}
  class:editing={state === "editing"}
>
  <div class="manual__step-icon"></div>
  <div on:click={onClick} class="manual__step-heading">
    <h2 class="manual__step-ordinal_number">#{index}</h2>
    <h2>{title}</h2>
    <div class="manual__step-heading_options">
      <Icon icon="mi:options-vertical" width={35} />
      <Icon icon="mi:options-vertical" width={35} />
    </div>
  </div>
  <div class="manual__step-line" />
  <div class="wrapper">
    <div class="test blue"></div>
  </div>
</div>

<style>
  .manual__step-container {
    --spacing-bottom: 3rem;
    --heading-size: 4rem;
    --clr-step-accent: var(--clr-neutral-500);

    display: grid;
    grid-template-rows: var(--heading-size) 0fr var(--spacing-bottom);
    grid-template-columns: 5rem 1fr;
    transition: grid-template-rows 300ms ease-out;
    column-gap: 1.5rem;
    row-gap: 0.5rem;
  }

  .manual__step-container.expanded {
    grid-template-rows: var(--heading-size) 1fr var(--spacing-bottom);
  }

  .manual__step-container.done {
    --clr-step-accent: var(--clr-green-400);
  }

  .manual__step-container.editing {
    --clr-step-accent: var(--clr-neutral-500);
  }

  .manual__step-container.editing .manual__step-line {
    margin-top: -0.75rem;
    position: relative;
    background-image: linear-gradient(
      to bottom,
      transparent 50%,
      var(--clr-step-accent) 50%
    ) !important;
  }

  .manual__step-container.editing .manual__step-line::before {
    content: "";
    position: absolute;
    aspect-ratio: 1;
    width: 0.75rem;
    bottom: 0;
    left: 50%;
    border-radius: 50%;
    background-color: var(--clr-step-accent);
    translate: -45% 0;
  }

  .manual__step-heading {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .manual__step-heading h2 {
    font-size: 2.125rem;
    font-weight: 300;
  }

  .manual__step-heading h2.manual__step-ordinal_number {
    font-family: "Ubuntu Mono", sans-serif;
    font-size: 2.5rem;
    color: #545454;
    font-weight: 600;
  }

  .manual__step-heading_options {
    margin-left: auto;
    display: flex;
  }

  .wrapper {
    overflow: hidden;
  }

  .test {
    height: 300px;
    background-color: var(--clr-neutral-300);
    border-top: 3px solid var(--clr-step-accent);
  }

  .manual__step-line {
    width: 3px;
    grid-row: span 2;
    background-image: linear-gradient(
      to bottom,
      var(--clr-step-accent),
      var(--clr-step-accent) 50%
    );
    background-size: 10px 20px;
    background-repeat: repeat;
    justify-self: center;
  }

  .manual__step-icon {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 3px solid var(--clr-step-accent);
    aspect-ratio: 1;
    width: 3rem;
    align-self: center;
    justify-self: center;
  }

  .manual__step-icon::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: var(--clr-step-accent);
    opacity: 0.3;
    border-radius: 50%;
    z-index: -1;
  }
</style>
