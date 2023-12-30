<script lang="ts">
  import AddDocIcon from "../../assets/icons/add-doc-icon.svelte";
  import AddImgIcon from "../../assets/icons/add-img-icon.svelte";
  import AddTableIcon from "../../assets/icons/add-table-icon.svelte";
  import ChecklistIcon from "../../assets/icons/checklist-icon.svelte";
  import QuoteIcon from "../../assets/icons/quote-icon.svelte";
  import CodeIcon from "../../assets/icons/code-icon.svelte";
  import LinkIcon from "../../assets/icons/link-icon.svelte";
  import TagIcon from "../../assets/icons/tag-icon.svelte";
  import Icon from "@iconify/svelte";
  import type { ManualComponentOption } from "../../global/types.ts";

  type IProps = {
    onAddComponent: (component: ManualComponentOption) => void;
  };

  const { onAddComponent } = $props<IProps>();
</script>

<div class="manual__toolbar-container">
  <button on:click={() => onAddComponent("text")}><AddDocIcon /></button>
  <button on:click={() => onAddComponent("checkbox")}><ChecklistIcon /></button>
  <button on:click={() => onAddComponent("table")}><AddTableIcon /></button>
  <button on:click={() => onAddComponent("image")}><AddImgIcon /></button>
  <Icon
    width="35"
    icon="material-symbols:add"
    class="manual__toolbar-container-add_icon"
  />
  <button on:click={() => onAddComponent("quote")}><QuoteIcon /></button>
  <button on:click={() => onAddComponent("code")}><CodeIcon /></button>
  <button on:click={() => onAddComponent("link")}><LinkIcon /></button>
  <button on:click={() => onAddComponent("link")}><TagIcon /></button>
</div>

<style>
  .manual__toolbar-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
    margin-top: 3rem;
  }

  .manual__toolbar-container > * {
    width: 4rem;
  }

  .manual__toolbar-container::before {
    content: "";
    position: absolute;
    width: 2px;
    height: 1.5rem;
    top: -2rem;
    left: 50%;
    translate: -50% 0;
    background-color: var(--clr-neutral-400);
  }

  .manual__toolbar-container button {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--clr-neutral-500);
    transition:
      color 200ms ease-in-out,
      translate 200ms ease-in-out;
  }

  .manual__toolbar-container button:hover {
    color: var(--clr-yellow-400);
    translate: 0 -10%;
  }

  :global(.manual__toolbar-container-add_icon) {
    color: var(--clr-red-400);
    margin-inline: 2rem;
  }
</style>
