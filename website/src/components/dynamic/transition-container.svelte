<script lang="ts">
  import { sineInOut } from "svelte/easing";
  import { stepsStore } from "./steps-store.svelte";
  import { DND_DURATION } from "../../global/constans";

  let animated = $state(false);

  $effect(() => {
    setTimeout(() => {
      animated = true;
    }, DND_DURATION);
  });

  function enter(node: HTMLElement, { duration }: { duration: number }) {
    if (!stepsStore.canAnimateComponent) return { duration: 0 };

    return {
      duration,
      css: (t: number) => {
        const eased = sineInOut(t);

        return `
          opacity: ${eased};
          grid-template-rows: ${eased}fr;
        `;
      },
    };
  }

  function leave(node: HTMLElement, { duration }: { duration: number }) {
    if (!stepsStore.canAnimateComponent) return { duration: 0 };

    let container = node.querySelector(".transition-container");
    container?.classList.remove("created");

    animated = false;

    return {
      duration,
      css: (t: number) => {
        const eased = sineInOut(t);
        return `
          grid-template-rows: ${eased}fr;
          opacity: ${eased};
        `;
      },
    };
  }
</script>

<div
  class="transition-container__wrapper"
  in:enter={{ duration: DND_DURATION }}
  out:leave={{ duration: DND_DURATION }}
>
  <div class="transition-container" class:created={animated}>
    <slot />
  </div>
</div>

<style>
  .transition-container__wrapper {
    position: relative;
    display: grid;
    background-color: rgba(255, 127, 80, 0.267);
  }

  .transition-container {
    overflow: hidden;
  }

  .transition-container.created {
    overflow: visible;
  }
</style>
