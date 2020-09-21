<template>
  <div class="workspace">
    <div class="pane-wrapper">
      <component
        class="pane"
        :is="selectedTemplate.components.pane"
        @updated="(props) => bannerProperties = props"
        @updateIsDownloadable="setIsDownloadable" />
    </div>
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
    <b-modal :active="isCardModalActive" @close="isCardModalActive = false" :width="640" scroll="keep">
      <div class="card content">
        <b-icon icon="exclamation-triangle" size="is-large" />
        <h2>Atenció</h2>
        <p>
          Vols tancar l'editor i tornar a la pantalla d'escollir tarja?
          Es perdran tots els canvis.
        </p>
        <b-button ref="confirm" type="is-primary" @click="back">Si, tanca</b-button>
        <b-button type="is-light" @click="isCardModalActive = false">No, continua editant</b-button>
      </div>
    </b-modal>
    <v-tour name="workspaceTour" :steps="workspaceSteps" :callbacks="tourCallbacks" :options="{ startTimeout: 500, labels }"></v-tour>
    <loading :active.sync="loadingTemplate" :is-full-page="true" color="#ff6600"></loading>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
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
    },
    // Autofocus default button on modal shown
    // Bring focus back to opener button on modal closed
    watch: {
      isCardModalActive: function (isActive) {
        const button = isActive ? 'confirm' : 'close'

        this.$nextTick(() => {
          this.$refs[button].$el.focus()
        })
      }
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
    grid-template-columns: 22rem 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "nav nav"
      "pane canvas";
    align-items: center;
    background: $gray-lightest;
    position: fixed;
    top: $navbar-height;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 40;

    .nav {
      grid-area: nav;
    }

    .pane-wrapper {
      display: flex;
      grid-area: pane;
      margin: 1.5rem 0 1.5rem 1.5rem;
      background-color: $white;
      box-shadow: 0 7px 25px -16px;
      align-self: stretch;
      border-radius: 1rem;
      overflow: hidden;

      .pane {
        width: 100%;
        overflow-y: auto;

        @include scrollbar();
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
      top: 1rem;
      right: 1.5rem;
    }
 }

 .card {
    padding: 2rem;
    border-radius: 1rem;

    .button {
      margin-right: 1rem;
    }

    p {
      display: block;
    }

    h2 {
      display: inline;
    }

    .icon.is-large {
      margin-left: -.75rem;
      margin-top: -.75rem;
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

      .pane-wrapper {
        position: relative;
        z-index: 15;
        box-shadow: 0 -.4rem 1.7rem -.3rem rgba($gray-900, .15),
          0 -.2rem 1rem -.5rem rgba($gray-900, .2),
          0 .4rem 1rem -.4rem rgba($gray-900, .015);
        border-radius: 1.5rem 1.5rem 0 0;
        overflow: visible;
        width: 100vw;
        margin: 0;

        .pane {
          padding: 1.5rem 1rem;
        }
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
