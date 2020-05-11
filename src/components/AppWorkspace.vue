<template>
  <div class="workspace">
    <app-nav
      class="nav"
      :is-card-modal-active="isCardModalActive"
      :template-name="selectedTemplate.name"
      @back="back"
      @hide="isCardModalActive = false" />
    <component
      class="pane"
      :is="selectedTemplate.components.pane"
      @updated="(props) => bannerProperties = props"
      @updateIsDownloadable="setIsDownloadable" />
    <canvas-container
      class="canvas"
      :canvas-component="selectedTemplate.components.canvas"
      :template="selectedTemplate"
      :banner="bannerProperties"
      :is-downloadable="isDownloadable" />
    <help
      id="help-button"
      class="help-block"
      :template="selectedTemplate" />
    <v-tour name="workspaceTour" :steps="workspaceSteps" :callbacks="tourCallbacks" :options="{ startTimeout: 500, labels }"></v-tour>
    <loading :active.sync="loadingTemplate" :is-full-page="true" color="#ff6600"></loading>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import AppNav from './AppNav'
import CanvasContainer from './CanvasContainer'
import Help from './Help'
import Loading from 'vue-loading-overlay'
import templates from './templates/templates'
import { workspaceSteps, labels } from '@/tour'
import { EventBus } from '@/event-bus'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'app-workspace',

  components: {
    AppNav,
    CanvasContainer,
    Help,
    Loading
  },

  data () {
    return {
      templates: templates,
      bannerProperties: null,
      selectedTemplate: null,
      loadingTemplate: true,
      isCardModalActive: false,
      isDownloadable: false,
      workspaceSteps: workspaceSteps,
      tourCallbacks: {
        onStop: this.onTourStop
      },
      labels: labels
    }
  },

  created () {
    // Find and set selected template based on route param
    this.selectedTemplate = this.templates.find(template => template.id.toLowerCase() === this.$route.params.pathMatch)

    // Hide loading indicator when template finishes loading
    EventBus.$on('paneLoaded', () => { this.loadingTemplate = false })
  },

  mounted () {
    this.startTour()
  },

  destroyed () {
    this.$tours['workspaceTour'].stop()
  },

  watch: {
    '$route': function (newRoute) {
      this.selectedTemplate = this.templates.find(template => template.id.toLowerCase() === newRoute.params.pathMatch)
    }
  },

  methods: {
    back (confirmed) {
      this.$router.push({ name: 'start', params: { confirmed } })
    },

    setIsDownloadable (isDownloadable) {
      this.isDownloadable = isDownloadable
    },

    onTourStop () {
      Cookies.set('visited_workspace_tour', 'true', { expires: 365 })
    },

    startTour () {
      EventBus.$on('paneLoaded', () => {
        if (!Cookies.get('visited_workspace_tour') && this.selectedTemplate.id === 'Headline') {
          this.$tours['workspaceTour'].start()
        }
      })
    }
  },

  beforeRouteLeave (to, from, next) {
    // Abort and show modal if going back unless 'confirmed' is explicitly set
    if (to.params.confirmed) {
      next()
    } else {
      this.isCardModalActive = true
      next(false)
    }
  }
}
</script>

<style lang="scss">
  @import "../sass/variables";

 .workspace {
    display: grid;
    grid-template-columns: 21rem 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "nav nav"
      "pane canvas";
    align-items: center;
    position: fixed;
    top: $navbar-height;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 40;

    .nav {
      grid-area: nav;
    }

    .pane {
      grid-area: pane;
      padding: 2rem 1rem 2rem 2rem;
      background-color: $white;
      box-shadow: 0 7px 25px -16px;
      overflow-y: scroll;
      align-self: stretch;

      &::-webkit-scrollbar {
        width: 1rem;
        background-color: $white;
      }

      &::-webkit-scrollbar-thumb {
        background-color: $gray-400;
        border-radius: 4rem;
        transition: .25s ease-in-out;
        border: .25rem $white solid;
      }

      &::-webkit-scrollbar-thumb:hover {
        background-color: $gray-600;
      }
    }

    .canvas {
      grid-area: canvas;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      max-height: 100%;
      overflow: hidden;
    }

    .help-block {
      position: absolute;
      top: 4rem;
      right: 1.5rem;
    }
 }

  @media (max-width: $xs-breakpoint) {
    .workspace {
      position: relative;
      margin-top: $navbar-height;
      grid-template-areas:
        "nav"
        "canvas"
        "pane";
      grid-template-columns: 1fr;
      grid-template-rows: 20px 400px 1fr;

      .canvas {
        position: fixed;
        top: 100px;
        z-index: 10;
        width: 100%;
      }

      .nav {
        z-index: 35;
        position: fixed;
        top: $navbar-height;
        width: 100%;
      }

      .pane {
        position: relative;
        z-index: 15;
        box-shadow: 0 -.4rem 1.7rem -.3rem rgba($gray-900, .15),
          0 -.2rem 1rem -.5rem rgba($gray-900, .2),
          0 .4rem 1rem -.4rem rgba($gray-900, .015);
        border-radius: 1.5rem 1.5rem 0 0;
        overflow: visible;
        padding: 1.5rem 1rem;
        width: 100vw;
      }

      .help-block {
        position: fixed;
        top: 3.5rem;
        right: 10rem;
        z-index: 35;

        .button.is-text {
          color: $white;
        }
      }
    }
  }
</style>
