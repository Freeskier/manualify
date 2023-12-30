<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { ManualComponent } from "../../global/types";
  import { stepsStore } from "./steps-store.svelte";
  import { getComponentName } from "../../utils/manual-utils.ts";

  type IProps = {
    setDisabled: (value: boolean) => void;
    component: ManualComponent;
  };

  const { component, setDisabled } = $props<IProps>();
  let { isAnimatedOnAdd, index, id, type, content } = component;
  let { markComponentAsAnimated, deleteComponent } = stepsStore;

  const componentName = getComponentName(type);
</script>

<div
  class="manual__component-wrapper"
  class:manual__component-step-in={!isAnimatedOnAdd}
  on:animationend={(e) => markComponentAsAnimated(id)}
>
  <div class="manual__component-container">
    <button
      class="manual__component-drag-handle"
      on:pointerdown={(e) => {
        setDisabled(false);
      }}
    >
      <Icon icon="mdi:drag-vertical" width="40" />
    </button>
    <div class="manual__component-content">
      <h4>{componentName} #{component.index}</h4>
      {content}
    </div>
    <button
      class="manual__component-delete"
      on:click={() => deleteComponent(id)}
    >
      <Icon icon="tdesign:delete" width="25" />
    </button>
  </div>
</div>

<style>
  .manual__component-wrapper {
    position: relative;
    display: grid;
    grid-template-rows: 1fr;
    opacity: 1;
    margin-top: 2rem;
  }

  .manual__component-wrapper h4 {
    color: var(--clr-neutral-500);
    letter-spacing: 2px;
    text-transform: uppercase;
    font-size: 1rem;
  }

  .manual__component-step-in {
    animation: step-in-component 300ms ease-in-out forwards;
  }

  .manual__component-container {
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: 3rem 1fr 3rem;
  }

  .manual__component-content {
    height: 10rem;
  }

  .manual__component-drag-handle {
    color: var(--clr-neutral-200);
    cursor: grab;
    align-self: center;
  }

  .manual__component-drag-handle:active {
    cursor: grabbing;
  }

  .manual__component-delete {
    --clr-delete: var(--clr-neutral-200);
    color: var(--clr-delete);
    position: relative;
    transition: color 200ms ease-in-out;
    align-self: center;
  }

  .manual__component-delete:hover {
    --clr-delete: var(--clr-red-400);
  }

  .manual__component-delete::before {
    content: "";
    position: absolute;
    width: 2.5rem;
    aspect-ratio: 1;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    opacity: 0;
    scale: 0.7;
    background-color: var(--clr-delete);
    border-radius: 50%;
    transition: all 200ms ease-in-out;
  }

  .manual__component-delete:hover::before {
    opacity: 0.2;
    scale: 1;
  }

  @keyframes step-in-component {
    from {
      grid-template-rows: 0fr;
      opacity: 0;
      margin-top: 0rem;
    }

    to {
      grid-template-rows: 1fr;
      opacity: 1;
      margin-top: 2rem;
    }
  }
</style>
