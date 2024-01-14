<script lang="ts">
  import OptionsAnimIcon from "../../assets/icons/options-icon.svelte";
  import IconButton from "../controls/icon-button.svelte";
  import type { ManualStepOption } from "../../global/types";
  import Icon from "@iconify/svelte";

  type IProps = {
    options: ManualStepOption[];
  };

  const { options } = $props<IProps>();
  let isOpen = $state(false);
</script>

<div class="options__container" class:open={isOpen}>
  <IconButton class="options__button" icon={OptionsAnimIcon} bind:isOpen />
  <div class="options__list-wrapper">
    <ul class="options__list">
      {#each options as option}
        <li>
          <button
            onclick={() => {
              isOpen = false;
              option.onclick();
            }}
            class="options__item"
            style={`${
              option.color ? "--clr-options-item: " + option.color : ""
            }`}
          >
            {#if typeof option.icon === "string"}
              <Icon icon={option.icon} width={26} height={26} />
            {:else}
              <svelte:component this={option.icon} />
            {/if}
            {option.text}
          </button>
        </li>
      {/each}
    </ul>
  </div>
  {#if isOpen}
    <div class="overlay" on:click={() => (isOpen = false)} aria-hidden="true" />
  {/if}
</div>

<style>
  .overlay {
    position: fixed;
    inset: 0;
    z-index: -2;
  }

  .options__container {
    position: relative;
    z-index: 2;
    isolation: isolate;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .options__container.open {
    z-index: 10;
  }

  .options__container.open .options__list-wrapper {
    grid-template-rows: 1fr;
    translate: 0 0;
    opacity: 1;
    transition: all 200ms ease-in-out;
  }

  .options__list-wrapper {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    display: grid;
    grid-template-rows: 0fr;
    translate: 0 -0.75rem;
    opacity: 0;
    box-shadow: 0 12px 16px 8px rgba(0, 0, 0, 0.3);
    width: 11rem;
  }

  .options__list {
    overflow: hidden;
  }

  .options__list li:not(:last-child) {
    border-bottom: 1px solid var(--clr-neutral-200);
  }

  .options__button {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .options__item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.5rem;
    color: var(--clr-neutral-500);
    background-color: var(--clr-neutral-300);
    transition: all 150ms ease-in-out;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .options__item:hover {
    color: var(--clr-options-item, var(--clr-yellow-400));
  }
</style>
