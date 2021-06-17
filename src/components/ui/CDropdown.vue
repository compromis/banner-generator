<template>
  <div class="c-dropdown" aria-role="list" @mouseover="showDropdown = true" @mouseleave="showDropdown = false">
    <button :class="['button', { 'is-ghost' : isGhost }]" :aria-controls="name + 'Dropdown'" :aria-extended="showDropdown ? 'true' : 'false'">
      <span class="trigger-label">
        {{ label }}
      </span>
      <font-awesome-icon :icon="['far', icon]" fixed-width />
      <slot name="trigger"></slot>
    </button>
    <div v-if="showDropdown" class="c-dropdown-list" :id="name + 'Dropdown'">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showDropdown: false
    }
  },

  methods: {
    toggleDropdown () {
      this.showDropdown = !this.showDropdown
    }
  },

  props: {
    name: {
      type: String,
      required: true
    },

    icon: {
      type: String,
      default: ''
    },

    label: {
      type: String,
      default: ''
    },

    isGhost: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";

.c-dropdown {
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding: .75rem;
  margin: -.75rem;

  &-list {
    position: absolute;
    background: $white;
    border: 1px solid $gray-200;
    border-radius: .5rem;
    color: $black;
    top: 3.5em;
    min-width: 12em;
    overflow: hidden;
  }

  .button {
    transition: .25s ease;
    text-align: right;
    border: 1px solid $gray-200;
    border-radius: .5rem;

    &:hover {
      text-decoration: none;
      background: $gray-100;
    }

    &:focus {
      outline: 0;
      box-shadow: 0 0 0 2px $primary;
    }

    .fa-user-circle {
      margin-left: .5rem;
    }
  }

  .is-ghost {
    color: $white;
    border-color: transparent;

    &:hover {
      color: $white;
      background: rgba($white, .15);
    }

    &:focus {
      box-shadow: 0 0 0 2px $white;
    }
  }
}

@media (max-width: $xs-breakpoint) {
  .trigger-label {
    display: none;
  }
}
</style>
