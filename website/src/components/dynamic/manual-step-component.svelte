<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { ManualComponent } from "../../global/types";
  import { stepsStore } from "./steps-store.svelte";
  import { getComponentName } from "../../utils/manual-utils.ts";
  import TransitionContainer from "./transition-container.svelte";
  import IconButton from "../controls/icon-button.svelte";

  type IProps = {
    setDisabled: (value: boolean) => void;
    component: ManualComponent;
  };

  const { component, setDisabled } = $props<IProps>();
  let { id, type, content } = component;
  let { deleteComponent } = stepsStore;

  const componentName = getComponentName(type);
</script>

<TransitionContainer>
  <div class="manual__component-container">
    <button
      class="manual__component-drag-handle"
      on:pointerdown={(e) => {
        setDisabled(false);
        stepsStore.canAnimateComponent = false;
      }}
    >
      <Icon icon="mdi:drag-vertical" width="40" />
    </button>
    <div class="manual__component-content">
      <h4>{componentName} #{component.index}</h4>
      <div>{id}</div>
    </div>
    <IconButton
      icon="mdi:delete-outline"
      colorHover="var(--clr-red-400)"
      color="var(--clr-neutral-200)"
      onclick={() => deleteComponent(id)}
    />
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
</style>
