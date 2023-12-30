<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { ManualComponent } from "../../global/types";
  import { stepsStore } from "./steps-store.svelte";
  import { getComponentName } from "../../utils/manual-utils.ts";
  import TransitionContainer from "./transition-container.svelte";

  type IProps = {
    setDisabled: (value: boolean) => void;
    component: ManualComponent;
  };

  const { component, setDisabled } = $props<IProps>();
  let { id, type, content } = component;
  let { setComponentAsAnimated, deleteComponent } = stepsStore;

  const componentName = getComponentName(type);
</script>

<TransitionContainer
  let:onDelete
  setAnimated={() => setComponentAsAnimated(id)}
  isAnimated={!component.isAnimatedOnAdd}
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
      on:click={() => onDelete(() => deleteComponent(id))}
    >
      <Icon icon="tdesign:delete" width="25" />
    </button>
  </div>
</TransitionContainer>

<style>
  .manual__component-container {
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: 3rem 1fr 3rem;
    margin-top: 2rem;
  }

  .manual__component-container h4 {
    color: var(--clr-neutral-500);
    letter-spacing: 2px;
    text-transform: uppercase;
    font-size: 1rem;
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
</style>
