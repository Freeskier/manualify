<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { ComponentType, SvelteComponent } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  type IProps = {
    icon: string | ComponentType<SvelteComponent<{ isOpen: boolean }>>;
    color?: string;
    colorHover?: string;
    size?: number;
    isOpen?: boolean;
    onClick: () => void;
  } & HTMLAttributes<HTMLButtonElement>;

  const {
    icon,
    color = "var(--clr-neutral-500)",
    colorHover = "var(--clr-neutral-500)",
    size = 30,
    isOpen = false,
    onClick,
    ...props
  } = $props<IProps>();
</script>

<button
  on:click={onClick}
  style={`--clr-btn: ${color}; --clr-btn-hover: ${colorHover};`}
  {...props}
>
  {#if typeof icon === "string"}
    <Icon {icon} width={size} height={size} />
  {:else}
    <svelte:component this={icon} {isOpen} />
  {/if}
</button>

<style>
  button {
    --clr-btn-hover: red;
    color: var(--clr-btn);
    position: relative;
    transition: color 200ms ease-in-out;
    align-self: center;
    display: flex;
    align-items: center;
    justify-self: center;
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
