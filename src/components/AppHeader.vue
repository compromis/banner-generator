<template>
  <div :class="{ 'navbar': true, 'navbar--light': !inWorkspace, 'navbar--dark': inWorkspace }">
    <router-link to="/" class="logo">
      <careta class="logo-careta" :logo-style="inWorkspace ? 'mono' : 'normal'" />
      <div :class="['nav-label logo-label', { 'is-hidden-mobile': inWorkspace }]">Generador de targes</div>
    </router-link>
    <transition name="fade">
      <rename-title class="nav-label template-label" v-if="template" />
    </transition>
    <transition name="fade">
      <last-saved v-if="template" />
    </transition>
    <transition name="fade">
      <nav-share v-if="template" class="nav-share" />
    </transition>
    <nav-login class="nav-login" />
  </div>
</template>

<script>
import Careta from '@/components/canvas/Careta'
import NavLogin from '@/components/ui/NavLogin'
import NavShare from '@/components/ui/NavShare'
import RenameTitle from '@/components/ui/RenameTitle'
import LastSaved from '@/components/ui/LastSaved.vue'

export default {
  name: 'app-header',

  components: {
    Careta,
    NavLogin,
    NavShare,
    RenameTitle,
    LastSaved
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
    padding: 0 1rem;
    height: $navbar-height;
    transition: .25s ease-in-out;
    z-index: 40;

    .logo {
      display: flex;
      align-items: center;

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
      margin-right: -.4rem;
      color: $white;
      margin-left: auto;
    }

    .nav-share {
      color: $white;
      margin-left: auto;
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
