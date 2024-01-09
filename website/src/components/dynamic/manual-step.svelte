<script lang="ts">
  import Icon from "@iconify/svelte";
  import Chevron from "../../assets/icons/chevron.svelte";
  import { dndzone, type DndEvent } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import ManualToolbar from "./manual-toolbar.svelte";
  import type {
    ManualComponent,
    ManualStepOption,
    ManualStepState,
    ManualStep,
  } from "../../global/types";
  import ManualStepComponent from "./manual-step-component.svelte";
  import { stepsStore } from "./steps-store.svelte";
  import TransitionContainer from "./transition-container.svelte";
  import ManualStepOptions from "./manual-step-options.svelte";

  type IProps = {
    id: string;
    index: number;
    title: string;
    stepState: ManualStepState;
    isOpen: boolean;
    components: ManualComponent[];
    step: ManualStep;
  };

  const { index, title, stepState, id, isOpen, components, step } =
    $props<IProps>();

  let { updateComponents, toggleOpen, deleteStep, moveStepDown, moveStepUp } =
    stepsStore;

  let dragDisabled = $state(true);
  const FLIP_DURATION = 300;

  const stepOptions: ManualStepOption[] = [
    {
      icon: "mdi:arrow-up",
      onClick: () => moveStepUp(id),
      text: "Move step up",
    },
    {
      icon: "mdi:arrow-down",
      onClick: () => moveStepDown(id),
      text: "Move step down",
    },
  ];

  function handleConsider(e: CustomEvent<DndEvent<ManualComponent>>) {
    if (components.length !== e.detail.items.length) {
      stepsStore.canAnimateComponent = true;
    }
    updateComponents(e.detail.items, id);
    dragDisabled = true;
  }

  function handleFinalize(e: CustomEvent<DndEvent<ManualComponent>>) {
    updateComponents(e.detail.items, id);
    dragDisabled = true;
    stepsStore.canAnimateComponent = false;

    setTimeout(() => (stepsStore.canAnimateComponent = true), 50);
  }
</script>

<TransitionContainer>
  <div
    class="manual__step-container"
    class:expanded={isOpen}
    class:done={stepState === "done"}
    class:editing={stepState === "editing"}
  >
    <div class="manual__step-icon"></div>
    <div class="manual__step-heading">
      <div class="manual__step-heading-title">
        <h2 class="manual__step-ordinal_number">#{index}</h2>
        <h2 contenteditable="true" bind:innerText={step.title}>{title}</h2>
      </div>
      <div class="manual__step-heading_options">
        <button on:click={() => toggleOpen(id)}>
          <Chevron {isOpen} size={25} />
        </button>
        <ManualStepOptions
          options={[
            ...stepOptions,
            {
              icon: "mdi:delete-outline",
              onClick: () => deleteStep(id),
              text: "Delete",
              color: "var(--clr-red-400)",
            },
          ]}
        />
      </div>
    </div>
    <div class="manual__step-line" />
    <div class="manual__step-content_wrapper">
      <div
        class="manual__step-content"
        use:dndzone={{
          items: components,
          flipDurationMs: FLIP_DURATION,
          dragDisabled,
          dropFromOthersDisabled: !isOpen,
          dropTargetClasses: ["drop-target"],
        }}
        on:consider={handleConsider}
        on:finalize={handleFinalize}
      >
        {#each components as component (component.id)}
          <div animate:flip={{ duration: FLIP_DURATION }}>
            <ManualStepComponent
              bind:component
              setDisabled={(value) => (dragDisabled = value)}
            />
          </div>
        {/each}
        <ManualToolbar stepId={id} {components} />
      </div>
    </div>
  </div>
</TransitionContainer>

<style>
  .manual__step-container {
    --move-in-duration: 300ms;
    --spacing-bottom: 3rem;
    --heading-size: 4rem;
    --clr-step-accent: var(--clr-neutral-500);

    display: grid;
    grid-template-rows: var(--heading-size) 0fr var(--spacing-bottom);
    grid-template-columns: 5rem 1fr;
    transition: grid-template-rows 300ms ease-out;
    column-gap: 1.5rem;
    row-gap: 0.5rem;
    padding-bottom: 0.5rem;
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
  }

  .manual__step-heading-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    opacity: 0;
    translate: -15% 0;
    animation: move-in-heading var(--move-in-duration) ease-in-out forwards;
  }

  .manual__step-heading-title h2 {
    font-size: 2.125rem;
    font-weight: 300;
  }

  .manual__step-heading-title h2.manual__step-ordinal_number {
    font-family: "Ubuntu Mono", sans-serif;
    font-size: 2.5rem;
    color: #545454;
    font-weight: 600;
  }

  .manual__step-heading_options {
    margin-left: auto;
    display: grid;
    grid-template-columns: repeat(2, 2rem);
    gap: 0.5rem;
    opacity: 0;
    animation: move-in-heading-options var(--move-in-duration) ease-in-out
      forwards;
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
    opacity: 0.15;
    width: 2.5rem;
  }

  .manual__step-content_wrapper {
    overflow: hidden;
    opacity: 0;
    transition: opacity 300ms ease-in;
    background-color: var(--clr-neutral-300);
    padding-inline: 2rem;
    position: relative;
  }

  .manual__step-content {
    display: flex;
    flex-direction: column;
    outline: none !important;
    min-height: 0 !important;
  }

  .manual__step-content_wrapper::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--clr-step-accent);
    width: 0;
    height: 3px;
    animation: move-in-border var(--move-in-duration) ease-in-out forwards;
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
    scale: 0.4;
    opacity: 0;
    animation: move-in-icon var(--move-in-duration) ease-in-out forwards;
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

  @keyframes move-in-icon {
    to {
      scale: 1;
      opacity: 1;
    }
  }

  @keyframes move-in-heading {
    to {
      opacity: 1;
      translate: 0 0;
    }
  }

  @keyframes move-in-heading-options {
    to {
      opacity: 1;
    }
  }

  @keyframes move-in-container {
    from {
      grid-template-rows: var(--heading-size) 0fr 0rem;
    }
    to {
      grid-template-rows: var(--heading-size) 1fr var(--spacing-bottom);
    }
  }

  @keyframes move-in-border {
    to {
      width: 100%;
    }
  }
</style>
