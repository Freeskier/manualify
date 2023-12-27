<script lang="ts">
  type IProps = {
    isOpen: boolean;
    size: number;
  };
  const { isOpen, size } = $props<IProps>();
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
  class:open={isOpen}
>
  <path
    style="fill:none;stroke:currentColor;stroke-width:3.5;stroke-dasharray:none;stroke-opacity:1"
    d={isOpen
      ? "M 2.4355467,7.3940944 12,17.072436 21.564453,7.4172305"
      : "M 2.4355467,16.959004 12,7.3945498 21.564453,16.959004"}
  />
</svg>

<style>
  svg path {
    transition: all 0.3s ease-in-out;
  }
</style>
