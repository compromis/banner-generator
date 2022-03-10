<template>
  <div class="template-selector">
    <div class="template-selector-templates">
      <h2 class="template-selector-header">Selecciona un model de tarja</h2>
      <transition-group tag="ul" name="fade">
        <template v-for="template in templates">
          <li v-if="!(template['hidden'] || (template['archived'] && !showArchive))" :key="template.id">
            <router-link :to="`/create/${template.id}`" :class="['template-item', `template-item-${template.id.toLowerCase()}`, template['isNew'] ? 'template-item-new' : '', template['archived'] ? 'template-archived' : '']">
              <span class="template-item-label" v-if="'label' in template">{{ template.label }}</span>
              <span class="template-item-icon">
                <b-icon :icon="template.icon" :pack="'iconPack' in template ? template.iconPack : 'far'" size="is-large" />
              </span>
              <span class="template-item-name">{{ template.name }}</span>
            </router-link>
          </li>
        </template>
      </transition-group>
    </div>
    <public-service-announcement />
    <app-footer />
    <browser-warning />
    <svg width="0" height="0">
      <radialGradient id="compromisGradient" r="150%" cx="30%" cy="107%">
        <stop class="gradient-start" offset="0" />
        <stop class="gradient-end" offset="1" />
      </radialGradient>
    </svg>
  </div>
</template>

<script>
import AppFooter from './AppFooter'
import PublicServiceAnnouncement from '@/components/utils/PublicServiceAnnouncement'
import BrowserWarning from '@/components/utils/BrowserWarning'

export default {
  name: 'template-selector',

  components: {
    AppFooter,
    PublicServiceAnnouncement,
    BrowserWarning
  },

  computed: {
    templates () {
      return this.$store.state.templates
    },

    showArchive () {
      return this.$store.state.settings.showArchive
    }
  },

  mounted () {
    this.$store.commit('setTemplate', null)
    this.$store.commit('updateBanner', null)
  }
}
</script>

<style lang="scss">
  @import '../sass/variables';

  .template-selector {
    display: grid;
    grid-template-rows: 1fr auto;
    padding-top: $navbar-height + 2rem;
    position: relative;
    height: 100vh;
    max-width: 70rem;
    margin: 0 auto;

    &-templates {
      h2 {
        color: rgba($gray-900, .25);
        padding: 1rem;
        font-size: 3rem;
        font-weight: bold;
        letter-spacing: -1px;
        line-height: 1;
      }
    }

    &-buttons {
      margin: 3rem 1rem 0 1rem;

      .button {
        opacity: .75;
      }
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      margin: 0 auto;
    }

    .template-item {
      display: block;
      position: relative;
      background: $white;
      margin: 1rem;
      color: $gray-900;
      font-size: 1.5rem;
      font-weight: bold;
      letter-spacing: -1px;
      width: 15.5rem;
      height: 15.5rem;
      border-radius: 1.5rem;
      box-shadow: $default-shadow;
      transition: .2s ease-in-out;

      .icon {
        transition: color .5s ease-in-out;
      }

      &:active {
        transform: rotate(0) scale(.95);
        opacity: .75;
      }

      &-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -4rem;
        margin-left: -3rem;
        background: $gray-200;
        color: $gray-500;
        width: 6rem;
        height: 6rem;
        border-radius: 1rem;

        svg {
          width: 2.5rem !important;
          height: 2.5rem;
        }
      }

      &-name {
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 1rem 1.25rem;
      }

      &-label {
        background: $blue;
        padding: .25rem .5rem;
        border-radius: .25rem;
        color: $white;
        font-size: 1rem;
        position: absolute;
        right: 1rem;
        top: -.85rem;
        transition: .25s ease-in-out;
      }

      &:hover {
        .template-item-label {
          background: $orange;
        }
      }
    }

    .template-archived {
      opacity: .5;

      &:hover {
        opacity: 1;
      }
    }
  }

  @media (min-width: $xs-breakpoint) {
    .template-selector {
      .template-item {
        &:hover {
          box-shadow: $raised-shadow;
          transform: rotate($rotation) scale(1.05);

          .template-item {
            &-name,
            &-icon .icon {
              background: linear-gradient(45deg, $gradient-start, $gradient-end);
              background-clip: text;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;

              svg * {
                fill: url(#compromisGradient) !important;
              }
            }
          }
        }

        &:active {
          transform: rotate(2deg) scale(0.95);
        }
      }
    }
  }

  @media (max-width: $xs-breakpoint) {
    .navbar.navbar--light .nav-login {
      color: $gray-900 !important;
    }

    .template-selector {
      h2 {
        font-size: 2.25rem;
        max-width: 18rem;
      }

      ul {
        justify-content: center;
        padding: 1rem;

        li {
          width: 100%;
        }
      }

      .template-item {
        width: auto;
        height: 8rem;
        margin: .5rem;
        border-radius: .5rem;

        &-icon {
          top: 1rem;
          bottom: 1rem;
          left: 1rem;
          margin: 0;

          .icon {
            transform: scale(0.75);
          }
        }

        &-name {
          font-size: 1.25rem;
          padding: 0;
          left: 8rem;
          top: 50%;
          bottom: unset;
          transform: translateY(-50%);
        }
      }
    }
  }
</style>
