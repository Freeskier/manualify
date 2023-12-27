<script lang="ts">
  import Icon from "@iconify/svelte";
  import Chevron from "../../assets/svgs/chevron.svelte";
  import { dndzone, type DndEvent } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import ManualToolbar from "./manual-toolbar.svelte";

  type IProps = {
    index: number;
    title: string;
    stepState: StepState;
  };

  type StepState = "editing" | "important" | "done";

  type StepComponent = {
    id: number;
    text: string;
  };

  const { index, title, stepState } = $props<IProps>();

  let isStepOpen = $state(true);
  let dragDisabled = $state(true);
  const FLIP_DURATION = 300;

  function onStepOpenClick() {
    isStepOpen = !isStepOpen;
  }

  let stepComponents = $state<StepComponent[]>([
    {
      id: 1,
      text: "Item 1",
    },
    {
      id: 2,
      text: "Item 2",
    },
    {
      id: 3,
      text: "Item 3",
    },
  ]);

  function handleConsider(e: CustomEvent<DndEvent<StepComponent>>) {
    stepComponents = e.detail.items;
    dragDisabled = true;
  }

  function handleFinalize(e: CustomEvent<DndEvent<StepComponent>>) {
    stepComponents = e.detail.items;
    dragDisabled = true;
  }
</script>

<div
  class="manual__step-container"
  class:expanded={isStepOpen}
  class:done={stepState === "done"}
  class:editing={stepState === "editing"}
>
  <div class="manual__step-icon"></div>
  <div class="manual__step-heading">
    <h2 class="manual__step-ordinal_number">#{index}</h2>
    <h2>{title}</h2>
    <div class="manual__step-heading_options">
      <button><Icon icon="ic:outline-edit" width={30} /></button>
      <button on:click={onStepOpenClick}>
        <Chevron isOpen={isStepOpen} size={25} />
      </button>
      <button><Icon icon="mi:options-vertical" width={30} /></button>
    </div>
  </div>
  <div class="manual__step-line" />
  <div class="manual__step-content_wrapper">
    <div
      class="manual__step-content"
      use:dndzone={{
        items: stepComponents,
        flipDurationMs: FLIP_DURATION,
        dragDisabled,
      }}
      on:consider={handleConsider}
      on:finalize={handleFinalize}
    >
      {#each stepComponents as item (item.id)}
        <div
          class="manual__step-component_container"
          animate:flip={{ duration: FLIP_DURATION }}
        >
          {item.text}
          <button
            class="manual__step-component_drag-handle"
            on:pointerdown={(e) => (dragDisabled = false)}
          >
            <Icon icon="mdi:drag-vertical" width="40" />
          </button>
        </div>
      {/each}
      <ManualToolbar />
    </div>
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

  .manual__step-container.expanded .manual__step-content_wrapper {
    opacity: 1;
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

  .manual__step-container svg {
    color: var(--clr-neutral-500);
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
    display: grid;
    grid-template-columns: repeat(3, 2rem);
    gap: 0.5rem;
  }

  .manual__step-heading_options button {
    color: var(--clr-neutral-500);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .manual__step-heading_options button::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    border-radius: 50%;
    background-color: var(--clr-neutral-500);
    opacity: 0;
    aspect-ratio: 1;
    width: 2rem;
    transition: all 0.15s ease-out;
  }
  .manual__step-heading_options button:hover::before {
    opacity: 0.15s;
    width: 2.5rem;
  }

  .manual__step-content_wrapper {
    overflow: hidden;
    opacity: 0;
    transition: opacity 300ms ease-in;
  }

  .manual__step-content {
    background-color: var(--clr-neutral-300);
    border-top: 3px solid var(--clr-step-accent);
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 4rem;
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

  .manual__step-component_container {
    position: relative;
    border: 1px solid var(--clr-neutral-500);
    height: 5rem;
  }

  .manual__step-component_drag-handle {
    position: absolute;
    left: 0;
    top: 50%;
    translate: -100% -50%;
  }
</style>
