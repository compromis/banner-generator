<template>
  <div class="c-dropdown-item">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";

.c-dropdown-item {
  cursor: pointer;
  color: $black;
  padding: .5rem .75rem;
  overflow: hidden;

  a {
    color: $black;
  }

  &:hover {
    text-decoration: none;
    background: $gray-100;
  }

  &:first-child {
    border-top-left-radius: .25rem;
    border-top-right-radius: .25rem;
  }

  &:last-child {
    border-bottom-left-radius: .25rem;
    border-bottom-right-radius: .25rem;
  }
}
</style>
