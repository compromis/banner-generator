<template>
  <div class="c-field">
    <div v-if="label" class="c-field-info">
      <label v-show="label">{{ label }}</label>
    </div>
    <ul :class="{'color-selector c-field-content': true, 'rounded' : isRounded }">
      <li v-for="color in colors" :key="color" :class="[`${color}-bg`, { active: value === color }]" @click="$emit('input', color)">
        <span v-if="!isRounded && !isFontColor">Aa</span>
      </li>
    </ul>
    <transition name="slide">
      <div>
        <b-message v-if="value === 'lgbt'" type="is-warning" size="is-small">
          Els colors LGTB s'han d'utilitzar únicament en targes relacionades amb aquest moviment.
        </b-message>
        <b-message v-if="value === 'feminism'" type="is-warning" size="is-small">
          El color morat s'ha d'utilitzar únicament en targes relacionades amb el feminisme.
        </b-message>
        <b-message v-if="value === 'transparent'" type="is-warning" size="is-small">
          Comprova que el text i logo es poden veure i llegir bé sobre la imatge de fons. Si no, recomanem seleccionar fons negre o taronja.
        </b-message>
      </div>
    </transition>
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
    colors: {
      type: Array,
      default: () => ['black', 'white', 'orange']
    },
    isRounded: {
      type: Boolean,
      default: false
    },
    isFontColor: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
@import "../../sass/variables";

.color-selector {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: .5rem;

  li {
    cursor: pointer;
    height: 2.25rem;
    border: .2rem $white solid;
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

  .none-bg {
    position: relative;
    background: $gray-100;
    color: $white;

    &::before {
      content: '';
      height: 2px;
      width: 23px;
      background: $red;
      position: absolute;
      top: 13px;
      left: 1px;
      transform: rotate(-45deg);
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
    color: $gray-900;
    background: $white;
  }

  .lgbt-bg {
    background: $gradient-lgtb;
    color: $white;
  }

  .feminism-bg {
    background: $gradient-feminista;
    color: $white;
  }

  .green-bg {
    background: $gradient-green;
  }

  .sumar-orange-bg {
    background: $sumar-orange;
    color: $white;
  }

  .sumar-fuchsia-bg {
    background: $sumar-fuchsia;
    color: $white;
  }

  /* Granissat colors */
  @each $name, $props in $granissat-colors {
    .#{$name}-bg {
      background: map-get($props, 'bg');
    }
  }

  .transparent-bg {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      border-bottom: 2px red solid;
      transform: rotate(-45deg) translate(0, -50%);
    }
  }
}

.rounded {
  display: flex;
  flex-wrap: wrap;

  li {
    height: 2.25rem;
    width: 2.25rem;
    border-radius: 50%;
    margin-right: .25rem;
    flex-shrink: 0;
  }
}
</style>

<style lang="scss" scoped>
.message {
  margin: .5rem 1rem 1rem;
}
</style>
