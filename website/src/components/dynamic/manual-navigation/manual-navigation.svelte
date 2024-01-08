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
  import type { ManualComponent } from '../../../global/types.ts'

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
          on:click={() => stepsStore.toggleOpen(step.id)}
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
          <ul class="manual-navigation__components-list">
            {#each step.components as component (component.id)}
              <li animate:flip={{ duration: 300 }}>
                <TransitionContainer>
                  <button 
                    on:pointerdown={(e) => e.preventDefault()}
                    on:click={(e) => eventsStore.rise('component-mention', "hi")}
                    class="manual-navigation__component-item">
                    <span
                      >{getComponentName(component.type)} #{component.index}</span
                    >
                    <Icon icon={getComponentIcon(component.type)} width={24} />
                  </button>
                </TransitionContainer>
              </li>
            {/each}
          </ul>
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
    overflow: hidden;
    margin-block: 0rem;
    margin-inline: 1.75rem 1rem;
    border-left: 2px solid var(--clr-accent);
    padding-left: 1rem;
    display: grid;
    gap: 0.75rem;
    transition: margin 300ms ease-in-out;
  }

  .manual-navigation__item-content span {
    justify-self: start;
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
  }

  :global(.manual-navigation__item-icon) {
    color: var(--clr-accent);
  }
</style>
