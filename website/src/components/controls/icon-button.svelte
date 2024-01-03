<script lang="ts">
  import Icon from "@iconify/svelte";

  type IProps = {
    icon: string;
    color: string;
    onClick: () => void;
    colorHover?: string;
    size?: number;
  };

  const {
    icon,
    color = "var(--clr-neutral-500)",
    onClick,
    colorHover = "var(--clr-neutral-500)",
    size = 30,
  } = $props<IProps>();
</script>

<button
  on:click={onClick}
  style={`--clr-btn: ${color}; --clr-btn-hover: ${colorHover};`}
>
  <Icon {icon} width={size} height={size} />
</button>

<style>
  button {
    --clr-btn-hover: red;
    color: var(--clr-btn);
    position: relative;
    transition: color 200ms ease-in-out;
    align-self: center;
  }

  button:hover {
    color: var(--clr-btn-hover);
  }

  button::before {
    content: "";
    position: absolute;
    width: 2.5rem;
    aspect-ratio: 1;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    opacity: 0;
    scale: 0.7;
    background-color: var(--clr-btn);
    border-radius: 50%;
    transition: all 200ms ease-in-out;
  }

  button:hover::before {
    opacity: 0.2;
    scale: 1;
    background-color: var(--clr-btn-hover);
  }
</style>
