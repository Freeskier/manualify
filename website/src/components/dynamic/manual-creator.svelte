<script>
  import ManualStep from "./manual-step.svelte";

</script>
<div class="manual__container">
  <ManualStep index={1} title="This is my first step" state="done"/>
  <ManualStep index={1} title="This is my first step" state="done"/>
  <ManualStep index={1} title="This is my first step" state="done"/>

  <ManualStep index={2} title="This is my second step" state="editing"/>
</div>

<style>
  .manual__container {
    max-width: 1000px;
    margin: 0 auto;
    width: 100%;
    display: grid;
    gap: 0.5rem;
    margin-top: 10rem;
  }
</style>