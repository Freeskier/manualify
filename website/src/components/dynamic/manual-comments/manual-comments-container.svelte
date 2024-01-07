<script lang="ts">
  type IProps = {
    onExpand: () => void;
  };

  const { onExpand } = $props<IProps>();
</script>

<button on:click={onExpand}>Expand</button>
