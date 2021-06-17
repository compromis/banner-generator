<template>
  <component :is="type" class="c-dropdown-item" :to="to || false">
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: ''
    }
  },

  computed: {
    type () {
      return this.to ? 'router-link' : 'button'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";

.c-dropdown-item {
  appearance: none;
  width: 100%;
  border: 0;
  display: flex;
  cursor: pointer;
  color: $black;
  padding: .5rem .75rem;
  overflow: hidden;
  align-items: center;
  background: $white;

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

@media (max-width: $xs-breakpoint) {
  .c-dropdown-item {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }
}
</style>
