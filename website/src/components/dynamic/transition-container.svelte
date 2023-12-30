<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  type IProps = {
    animationStart?: number;
    setAnimated?: () => void;
    isAnimated?: boolean;
  } & HTMLAttributes<HTMLDivElement>;

  const {
    animationStart = 0,
    setAnimated,
    isAnimated = true,
    ...props
  } = $props<IProps>();
  let isDeleting = $state(false);
  let wrapper = $state<HTMLDivElement>();

  function onDelete(callback: () => void) {
    wrapper?.addEventListener("animationend", callback);
    isDeleting = true;
  }
</script>

<div
  {...props}
  bind:this={wrapper}
  class="transition-container__wrapper"
  style={`--anim-start: ${animationStart}fr`}
  class:create={isAnimated}
  class:delete={isDeleting}
  on:animationend={setAnimated}
>
  <div class="transition-container">
    <slot {onDelete} />
  </div>
</div>

<style>
  .transition-container__wrapper {
    display: grid;
    grid-template-rows: 1fr;
  }

  .transition-container__wrapper.create {
    animation: onCreate 300ms ease-out forwards;
  }

  .transition-container__wrapper.delete {
    animation: onDelete 300ms ease-out forwards;
  }

  .transition-container {
    overflow: hidden;
  }

  @keyframes onCreate {
    from {
      grid-template-rows: var(--anim-start, 0fr);
    }

    to {
      grid-template-rows: 1fr;
    }
  }

  @keyframes onDelete {
    from {
      grid-template-rows: 1fr;
    }

    to {
      grid-template-rows: 0fr;
      opacity: 0;
    }
  }
</style>
