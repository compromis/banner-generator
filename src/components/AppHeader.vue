<template>
  <div :class="{ 'navbar': true, 'navbar--dark': inWorkspace }">
    <router-link to="/" class="logo">
      <careta class="logo-careta" :logo-style="inWorkspace ? 'mono' : 'normal'" />
      <div :class="['nav-label logo-label', { 'is-hidden-mobile': inWorkspace }]">Generador de targes</div>
    </router-link>
    <transition name="fade">
      <rename-title class="nav-label template-label" v-if="template" />
    </transition>
    <nav-login class="nav-login" />
  </div>
</template>

<script>
import Careta from '@/components/canvas/Careta'
import NavLogin from '@/components/ui/NavLogin'
import RenameTitle from '@/components/ui/RenameTitle'

export default {
  name: 'app-header',

  components: {
    Careta,
    NavLogin,
    RenameTitle
  },

  props: {
    inWorkspace: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    template () {
      return this.$store.state.template
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../sass/variables";

  .navbar {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: transparent;
    padding: .75rem 1rem;
    height: $navbar-height;
    transition: .25s ease-in-out;
    z-index: 50;

    .logo {
      display: flex;

      &-careta {
        color: $white;
        height: 1.75rem;
      }

      &-label {
        margin-left: .75rem;
        color: $gray-700;
        transition: opacity .2s;
      }
    }

    .nav-label {
      display: flex;
      align-items: center;
      font-size: 1.25rem;
      letter-spacing: -.3px;
      line-height: 1;
      white-space: nowrap;
      transition: .25s ease-in-out;
    }

    .template-label {
      margin-left: .4rem;
      color: $white;
      flex-grow: 1;

      span {
        margin-right: .4rem;
      }
    }

    .spacer {
      flex-grow: 1;
    }

    .nav-login {
      margin-top: -.4rem;
      margin-right: -.4rem;
      margin-left: auto;
      color: $white;
    }

    &--dark {
      background: $gray-900;
      color: $white;

      .logo {
        &-label {
          color: $white;
          opacity: .75;
        }

        &:hover {
          .logo-label {
            opacity: 1;
          }
        }
      }
    }
  }

  @media (max-width: $xs-breakpoint) {
    .navbar {
      z-index: 100;
      padding: .75rem 1rem;
    }

    .navbar:not(.navbar--dark) {
      background: $white;
    }
  }
</style>
