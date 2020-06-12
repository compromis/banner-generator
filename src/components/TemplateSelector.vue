<template>
  <div class="template-selector">
    <div class="template-selector-templates">
      <h2 class="template-selector-header">Selecciona un model de tarja</h2>
      <ul>
        <template v-for="template in templates">
          <li v-if="!(template['hidden'] || (template['archived'] && !showArchive))" :key="template.id">
            <router-link :to="`/${template.id.toLowerCase()}`" :class="['template-item', `template-item-${template.id.toLowerCase()}`, template['isNew'] ? 'template-item-new' : '', template['archived'] ? 'template-archived' : '']">
              <span class="template-item-label" v-if="'label' in template">{{ template.label }}</span>
              <span class="template-item-icon">
                <b-icon :icon="template.icon" :pack="'iconPack' in template ? template.iconPack : 'far'" size="is-large" />
              </span>
              <span class="template-item-name">{{ template.name }}</span>
            </router-link>
          </li>
        </template>
      </ul>
    </div>
    <app-footer @archive="(show) => showArchive = show" />
    <v-tour name="selectorTour" :steps="selectorSteps" :callbacks="tourCallbacks" :options="{ labels }"></v-tour>
    <BrowserWarning />
    <svg width="0" height="0">
      <radialGradient id="compromisGradient" r="150%" cx="30%" cy="107%">
        <stop class="gradient-start" offset="0" />
        <stop class="gradient-end" offset="1" />
      </radialGradient>
    </svg>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import browser from 'browser-detect'
import templates from './templates/templates'
import AppFooter from './AppFooter'
import { selectorSteps, labels } from '../tour'
import BrowserWarning from '../utils/BrowserWarning'

export default {
  name: 'template-selector',

  components: {
    AppFooter,
    BrowserWarning
  },

  data () {
    return {
      templates: templates,
      selectorSteps: selectorSteps,
      tourCallbacks: {
        onStop: this.onTourStop
      },
      labels: labels,
      showArchive: false
    }
  },

  mounted () {
    const result = browser()
    if (!Cookies.get('visited_selector_tour') && !result.mobile) this.$tours['selectorTour'].start()
  },

  methods: {
    onTourStop () {
      Cookies.set('visited_selector_tour', 'true', { expires: 365 })
    }
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
      width: 15rem;
      height: 15rem;
      border-radius: 1rem;
      box-shadow: $default-shadow;
      transition: .2s ease-in-out;

      .icon {
        transition: color .5s ease-in-out;
      }

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
        border-radius: .5rem;

        .icon {
          transform: scale(1.5);
        }
      }

      &-name {
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 1rem;
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

  @media (max-width: $xs-breakpoint) {
    .template-selector {
      h2 {
        font-size: 2.25rem;
        margin-top: 4rem;
        width: 18rem;
      }

      ul {
        justify-content: center;
      }

      .template-item {
        width: 10rem;
        height: 10rem;
        margin: .5rem;
        border-radius: .5rem;

        &-name {
          font-size: 1rem;
          padding: .75rem;
        }
      }
    }
  }
</style>
