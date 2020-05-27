<template>
  <div>
    <ul :class="{'careta-selector': true, 'is-rounded': isRounded }">
      <li :class="{'normal' : true, 'active': value === 'normal'}" @click="$emit('input', 'normal')">
          <careta v-if="!isRounded" logo-style="normal"></careta>
      </li>
      <li :class="{'feminista' : true, 'active': value === 'feminista'}" @click="$emit('input', 'feminista')">
          <careta v-if="!isRounded" logo-style="feminista"></careta>
      </li>
      <li :class="{'lgtb' : true, 'active': value === 'lgtb'}" @click="$emit('input', 'lgtb')">
          <careta v-if="!isRounded" logo-style="lgtb"></careta>
      </li>
      <li v-if="!isRounded" :class="{'dol' : true, 'active': value === 'dol'}" @click="$emit('input', 'dol')">
          <careta logo-style="dol"></careta>
      </li>
    </ul>
    <b-message v-if="value === 'feminista' && isRounded === false" type="is-warning" size="is-small">
      El logo Compromís Feminista està pensat per ser utilitzat a les xarxes únicament
      el 8 de març o altres dates simbòliques del feminisme.
    </b-message>
    <b-message v-if="value === 'lgtb' && isRounded === false" type="is-warning" size="is-small">
      El logo Compromís LGTB està pensat per ser utilitzat a les xarxes únicament
      durant el mes de l'orgull o altres dates simbòliques del moviment LGTB.
    </b-message>
    <b-message v-if="value === 'dol' && isRounded === false" type="is-warning" size="is-small">
      Aquesta versió del logo està reservada per a dies de dol.
    </b-message>
  </div>
</template>

<script>
import Careta from './Careta'

export default {
  name: 'careta-selector',

  components: {
    Careta
  },

  props: {
    isRounded: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: 'normal'
    }
  }
}
</script>

<style lang="scss">
@import "../sass/variables";

.careta-selector {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: .5rem;

  li {
    border: .25rem solid $gray-200;
    border-radius: .5rem;
    transition: .25s ease-in-out;

    svg {
      display: block;
      width: 100%;
      border: .5rem solid $white;
      border-radius: .3rem;
    }

    &:hover {
      border-color: $gray-400;
    }

    &.active {
      border-color: $primary;
      background: $white;

      svg {
        border-color: $white;
      }
    }
  }

  &.is-rounded {
    opacity: .5;
    transition: .25s ease-in-out;

    &:hover {
      opacity: 1;
    }
    li {
      height: 2.25rem;
      width: 2.25rem;
      background: $gradient;
      border-radius: 50%;
      border-color: $white;
      border-width: .2rem;
      box-shadow: 0 0 0 2px $gray-400;

      &:hover {
        box-shadow: 0 0 0 2px $gray-600;
      }

      &.active {
        box-shadow: 0 0 0 2px $orange;
      }

      &.feminista {
        background: $gradient-feminista;
      }
      &.lgtb {
        background: $gradient-lgtb;
      }
    }
  }
}

.message-body {
  font-size: .85rem;
  margin-top: 1rem;
}
</style>
