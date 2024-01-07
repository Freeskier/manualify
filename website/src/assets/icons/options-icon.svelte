<script lang="ts">
  type IProps = {
    isOpen: boolean;
  };

  const { isOpen } = $props<IProps>();
</script>

<svg
  aria-hidden="true"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 32 32"
  width="30"
  height="30"
  shape-rendering="geometricPrecision"
  text-rendering="geometricPrecision"
  style="fill:var(--clr-neutral-500);"
  class:active={isOpen}
>
  <rect y="7.25" class="upper" width="3.5" height="3.5" stroke-width="0" />
  <rect y="14.25" class="middle" width="3.5" height="3.5" stroke-width="0" />
  <rect y="21.25" class="lower" width="3.5" height="3.5" stroke-width="0" />
</svg>

<style>
  .active > * {
    transition:
      y 150ms ease-in-out,
      rotate 100ms ease-in-out 150ms,
      scale 150ms ease-in-out 200ms;
  }

  svg > * {
    transition:
      y 150ms ease-in-out 200ms,
      rotate 100ms ease-in-out 150ms,
      scale 150ms ease-in-out;
    transform-origin: center;
    x: 14.25;
    scale: 1.25;
  }

  .active .upper {
    y: 14.25;
    rotate: -45deg;
    scale: 1 6;
  }

  .active .middle {
    rotate: -45deg;
    scale: 1;
  }

  .active .lower {
    y: 14.25;
    rotate: -45deg;
    scale: 6 1;
  }
</style>
