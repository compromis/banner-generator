<template>
  <div class="c-tab-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CTabGroup'
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";

.c-tab-group {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  label {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  label:not(:last-child) {
    border-right: 1px solid $gray-400;
  }
}
</style>
