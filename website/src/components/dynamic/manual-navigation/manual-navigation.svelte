<script lang="ts">
  import Icon from "@iconify/svelte";
  import Chevron from "../../../assets/icons/chevron.svelte";
  import {
    getComponentIcon,
    getComponentName,
    getStepAccentColor,
  } from "../../../utils/manual-utils";
  import { stepsStore } from "../steps-store.svelte";
  import { eventsStore } from "../events-store.svelte";
  import TransitionContainer from "../transition-container.svelte";
  import { flip } from "svelte/animate";
  import type { ManualComponent } from "../../../global/types.ts";
  import { fade } from "svelte/transition";
</script>

<ul class="manual-navigation__list">
  {#each stepsStore.steps as step (step.id)}
    <li
      animate:flip={{ duration: 500 }}
      class="manual-navigation__item"
      style={`--clr-accent: ${getStepAccentColor(step)}`}
    >
      <TransitionContainer>
        <button
          class="manual-navigation__item-content"
          on:click={() => {
            eventsStore.raise('test1', "hi")
            stepsStore.toggleOpen(step.id)
            }}
        >
          <Icon
            icon={step.icon}
            width={32}
            class="manual-navigation__item-icon"
          />
          <span>{step.title}</span>
          <Chevron size={24} isOpen={step.isOpen} />
        </button>
        <div
          class="manual-navigation__components-wrapper"
          class:expand={step.isOpen}
        >
        <div class="manual-navigation__components-list">
          <ul >
            {#each step.components as component (component.id)}
              <li animate:flip={{ duration: 300 }}>
                <TransitionContainer>
                  <button
                    on:pointerdown={(e) => e.preventDefault()}
                    class="manual-navigation__component-item"
                  >
                    <span
                      >{getComponentName(component.type)} #{component.index}</span
                    >
                    <Icon icon={getComponentIcon(component.type)} width={24} />
                  </button>
                </TransitionContainer>
              </li>
            {/each}

          </ul>
          {#if step.components.length === 0}
          <TransitionContainer>
            <span
              in:fade={{ duration: 200 }}
              out:fade={{ duration: 200 }}
              class="manual-navigation__components-empty">                
              List of components is empty.                
            </span>
          </TransitionContainer>
          {/if}
        </div>
        </div>
      </TransitionContainer>
    </li>
  {/each}
</ul>

<style>
  .manual-navigation__item-content {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 1rem;
    align-items: center;
    width: 100%;
    padding: 0.75rem 1rem;
    border-bottom: 2px solid var(--clr-neutral-400);
    background-color: var(--clr-neutral-300);
    color: var(--clr-neutral-500);
    font-size: 1.125rem;
  }

  .manual-navigation__components-wrapper {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 300ms ease-in-out;
  }

  .manual-navigation__components-wrapper.expand {
    grid-template-rows: 1fr;
  }

  .manual-navigation__components-wrapper.expand
    .manual-navigation__components-list {
    margin-block: 1rem;
  }

  .manual-navigation__components-list {
    position: relative;
    overflow: hidden;
    display: grid;
    transition: margin 300ms ease-in-out, border-color 100ms ease-in-out;
  }

  .manual-navigation__components-list ul {
    border-left: 2px solid var(--clr-accent);
    margin-block: 0rem;
    margin-inline: 1.75rem 1rem;
    padding-left: 1rem;
  }

  .manual-navigation__item-content span {
    justify-self: start;
  }

  .manual-navigation__components-list:has(.manual-navigation__components-empty) {
    border-color: transparent;
  }

  .manual-navigation__components-empty {
    color: var(--clr-neutral-400);
    padding-block: calc(0.5rem - 0.5px);
    margin-inline: auto;
    width: 100%;
    display: block;
    text-align: center;
  }

  .manual-navigation__component-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--clr-neutral-400);
    text-transform: uppercase;
    font-size: 0.875rem;
    letter-spacing: 1px;
    font-weight: 600;
    padding-block: 0.5rem;
  }

  :global(.manual-navigation__item-icon) {
    color: var(--clr-accent);
  }
</style>
