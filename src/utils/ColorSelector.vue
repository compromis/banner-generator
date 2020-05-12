<template>
  <div>
    <label class="label" v-show="label">{{ label }}</label>
    <ul :class="{'color-selector': true, 'rounded' : isRounded }">
      <li :class="{'black-bg' : true, 'active': value === 'black' }" @click="$emit('input', 'black')"><span v-if="!isRounded">Aa</span></li>
      <li :class="{'white-bg' : true, 'active': value === 'white' }" @click="$emit('input', 'white')"><span v-if="!isRounded">Aa</span></li>
      <li :class="{'orange-bg' : true, 'active': value === 'orange' }" @click="$emit('input', 'orange')"><span v-if="!isRounded">Aa</span></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'color-selector',

  props: {
    value: {
      type: String,
      default: 'black'
    },
    label: {
      type: String,
      default: ''
    },
    isRounded: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
@import "../sass/variables";

.color-selector {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: .5rem;
  margin-bottom: 1.5rem;

  li {
    cursor: pointer;
    border-color: $white;
    border: .2rem solid;
    border-radius: .5rem;
    box-shadow: 0 0 0 2px $gray-200;
    transition: .25s ease-in-out;
    font-weight: bold;
    line-height: 1;

    span {
      display: block;
      padding: .5rem;
      border-radius: .4rem;
    }

    &:hover {
      box-shadow: 0 0 0 2px $gray-400;
    }

    &.active {
      box-shadow: 0 0 0 2px $primary;
    }
  }

  .black-bg {
    background: $gray-darkest;
    color: $white;
  }

  .orange-bg {
    background: $gradient;
    color: $white;
  }

  .white-bg {
    color: $white;
    background: $gradient;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.rounded {
  display: flex;

  li {
    height: 2.25rem;
    width: 2.25rem;
    border-radius: 50%;
    margin-right: .5rem;
  }
}
</style>
