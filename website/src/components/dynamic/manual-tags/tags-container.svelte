<script lang="ts">
  import { flip } from "svelte/animate";
  import { fade } from 'svelte/transition'
  import { tagsStore } from "../tags-store.svelte.ts";
  import TagItem from "./tag-item.svelte";

  const colors = [
"#b656db", 
"#fe4840", 
"#4df9d8", 
"#d91d60", 
"#354f97", 
"#86fdac", 
"#58870e", 
"#7be492", 
"#82c1fc", 
"#82babf", 
"#175ece", 
"#16e140", 
"#1c4b3c", 
"#057e2b", 
"#744afd", 
"#c2c89c", 
"#67b990", 
"#884dd1", 
"#923409", 
"#134b95", 
"#07fbc5",
]

let inputFocused = $state(false)
let inputValue = $state('')

</script>

<div class="tags__container">
  <ul class="tags__list">
    {#each tagsStore.tags as tag (tag.id)}
      <li animate:flip={{duration: 200}} in:fade>
        <TagItem {tag} deletable/>
      </li>
    {/each}
      <input
      class="tags__input"
      placeholder="Add tag here"
      bind:value={inputValue}
      on:focus={() => inputFocused = true}
      on:change={(e) =>
      tagsStore.addNewTag({
        text: (e.target as HTMLInputElement).value,
        color: colors[Math.floor(Math.random() * colors.length)],
        id: self.crypto.randomUUID(),
      })}
  />
  </ul>
  <div class="tags__dropdown" class:expand={inputFocused}>
    <p>Select existing tag or create new one</p>
    <button>Create "{inputValue}"</button>
    <ul class="tags__available-list">
      {#each tagsStore.tags as tag (tag.id)}
        <li>
          <TagItem {tag} onClick={(tag) => tagsStore.addNewTag(tag)} addIcon/>
        </li>
      {/each}
    </ul>
  </div>
  <div aria-hidden="true" class:overlay={inputFocused} on:click={() => inputFocused = false}/>
</div>

<style>
  .overlay {
    position: fixed;
    inset: 0;
    z-index: -1;
  }

  .tags__container {
    position: relative;
    justify-self: center;
    width: 100%;
    max-width: 50rem;
    background-color: var(--clr-neutral-300);
    padding: 1rem;
    isolation: isolate;
  }

  .tags__list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .tags__input {
    min-width: 5rem;
    background-color: transparent;
    font-size: 1rem;
    border: 1px solid transparent;
  }

  .tags__dropdown {
    position: absolute;
    display: none;
    gap: 1rem;
    top: 100%;
    left: 0;
    right: 0;
    padding: 0.5rem 1rem 1rem 1rem;
    border-top: 1px solid;
    border-color: transparent;
    transition: all 200ms ease-in-out;
    background-color: var(--clr-neutral-300);
  }

  .tags__dropdown.expand {
    border-color: var(--clr-neutral-200);
    display: grid;
  }

  .tags__dropdown p {
    font-weight: 600;
    font-size: 0.825rem;
    letter-spacing: 1px;
    color: var(--clr-neutral-500);
  }

  .tags__available-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
</style>
