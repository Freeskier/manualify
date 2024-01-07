<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { ManualTag } from "../../../global/types";
  import { tagsStore } from "../tags-store.svelte.ts";

  type IProps = {
    tag: ManualTag;
    deletable?: boolean;
    addIcon?: boolean;
    onClick?: (tag: ManualTag) => void;
  };
  const { tag, deletable, addIcon, onClick } = $props<IProps>();
</script>

<button
  on:click={() => (onClick ? onClick(tag) : null)}
  class="tag-item__container"
  style={`--clr-tag:${tag.color}`}
>
  {#if addIcon}
    <Icon icon="mdi:plus" width="20" />
  {/if}
  <span>{tag.text}</span>
  {#if deletable}
    <button on:click={() => tagsStore.removeTag(tag)}>
      <Icon icon="mdi:delete-outline" width="20" />
    </button>
  {/if}
</button>

<style>
  .tag-item__container {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    border: 1px solid;
    border-color: var(--clr-tag);
    padding: 0.25rem 0.25rem;
    color: var(--clr-tag);
    max-width: 50rem;
    isolation: isolate;
  }

  .tag-item__container::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: var(--clr-tag);
    opacity: 0.2;
    z-index: -1;
  }

  .tag-item__container span {
    font-weight: 500;
    font-size: 1rem;
  }

  .tag-item__container button {
    display: flex;
    align-items: center;
    justify-content: center;
    color: inherit;
  }
</style>
