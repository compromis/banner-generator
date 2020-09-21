<template>
  <div :class="{ 'navbar': true, 'navbar--dark': inWorkspace }">
    <router-link to="/" class="logo">
      <careta class="logo-careta" :logo-style="inWorkspace ? 'mono' : 'normal'" />
      <div class="nav-label logo-label">Generador de targes</div>
    </router-link>
    <transition name="fade">
      <div v-if="template" class="nav-label template-label">
        &gt; {{ template.name }}
      </div>
    </transition>
  </div>
</template>

<script>
import templates from './templates/templates'
import Careta from '@/utils/Careta'

export default {
  name: 'app-header',

  data () {
    return {
      templates
    }
  },

  components: {
    Careta
  },

  props: {
    inWorkspace: Boolean
  },

  computed: {
    template () {
      return this.templates.find(template => template.id.toLowerCase() === this.$route.params.pathMatch)
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
    padding: .75rem 2rem;
    height: $navbar-height;
    transition: .25s ease-in-out;

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
      opacity: .75;
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
  }
</style>
