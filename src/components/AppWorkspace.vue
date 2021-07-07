<template>
  <div>
    <div class="workspace" v-if="template && !error">
      <div class="toolbar">
        <b-button to="/" tag="router-link" icon-left="chevron-left" type="is-text">Enrere</b-button>
      </div>
      <component :is="template.components.pane" class="pane" />
      <canvas-container :canvas-component="template.components.canvas" class="canvas" />
      <help id="help-button" class="help-block" />
      <c-popup :show-popup="showPopup">
        Inicia sessió amb l'Espai Compromís per a guardar versions editables de les teues targes.
        <template v-slot:buttons>
          <b-button @click="hideReminder">Ara no</b-button>
          <b-button type="is-primary" class="mr-0" tag="a" :href="ssoLoginUrl">Incia sessió</b-button>
        </template>
      </c-popup>

      <portal to="confirm">
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
      </portal>
      <loading :active.sync="loadingTemplate" :is-full-page="true" color="#ff6600"></loading>
    </div>
    <div v-else-if="error" class="banner-message error">
      <div>
        <p>No tens accés a aquesta tarja</p>
        <a :href="ssoLoginUrl">Inicia sessió</a>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/http'
import CanvasContainer from './CanvasContainer'
import Help from './Help'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import CPopup from './ui/CPopup'

export default {
  name: 'app-workspace',

  components: {
    CanvasContainer,
    Help,
    Loading,
    CPopup
  },

  data () {
    return {
      isCardModalActive: false,
      goingTo: null,
      banner: null,
      error: false,
      ssoLoginUrl: process.env.VUE_APP_SSO_LOGIN_URL,
      showPopup: false
    }
  },

  computed: {
    template () {
      return this.$store.state.template
    },

    templates () {
      return this.$store.state.templates
    },

    loadingTemplate () {
      return this.$store.state.banner === null
    },

    isLoggedIn () {
      return this.$store.getters['auth/isLoggedIn']
    }
  },

  async created () {
    try {
      const banner = await http.banner(this.$route.params.ref)
      this.$store.commit('setBannerMeta', banner)
      this.setTemplate(banner.type)
    } catch (error) {
      this.error = true
    }

    const reminderLimit = localStorage.getItem('login_reminder')
    const now = new Date()
    if (!this.isLoggedIn && now.getTime() > reminderLimit) {
      this.showPopup = true
    }
  },

  watch: {
    // Autofocus default button on modal shown
    // Bring focus back to opener button on modal closed
    isCardModalActive: function (isActive) {
      // --- FIX ----
      // const button = isActive ? 'confirm' : 'close'
      // this.$nextTick(() => {
      //    this.$refs[button].focus()
      // })
    }
  },

  methods: {
    back (confirmed) {
      const name = this.goingTo.name || 'start'
      this.$router.push({ name, params: { confirmed } })
    },

    setTemplate (name) {
      const template = this.templates.find(template => template.id === name)
      this.$store.commit('setTemplate', template)
      this.$store.commit('setAspect', template.aspects[0])
      this.$store.commit('setDisplayErrors', false)
    },

    hideReminder () {
      this.showPopup = false
      const now = new Date()
      localStorage.setItem('login_reminder', now.getTime() + 7 * 24 * 60 * 60 * 1000)
    }
  },

  beforeRouteLeave (to, from, next) {
    // Abort and show modal if going back unless 'confirmed' is explicitly set
    // or user is logged in
    if (to.params.confirmed || this.isLoggedIn) {
      next()
    } else {
      this.isCardModalActive = true
      this.goingTo = to
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
    align-items: stretch;
    background: $gray-lightest;
    position: fixed;
    top: $navbar-height;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 35;

    .nav {
      grid-area: nav;
    }

    .pane {
      display: flex;
      grid-area: pane;
      background-color: $white;
      border-right: 1px $gray-300 solid;
      width: 100%;
      overflow-y: auto;
      flex-direction: column;

      @include scrollbar();
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

  .toolbar {
    display: none;
  }

  .banner-message {
    height: 100vh;
    font-size: calc(1rem + 1vw);
    color: $gray-700;
    display: grid;
    place-items: center;
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
        padding: 0;

        .b-tabs {
          margin: 0 !important;
        }
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
        border-radius: 1rem 1rem 0 0;
        width: 100vw;
        margin: 0;
        max-height: unset;
        overflow: hidden;
      }

      .help-block {
        position: fixed;
        top: 3.5rem;
        right: 9rem;
        z-index: 10;

        .button.is-text {
          color: $white;
        }
      }

      .toolbar {
        display: flex;
        position: fixed;
        top: 3.25rem;
        left: 0;
        right: 0;
        height: 3rem;
        background: $gray-800;
        align-items: center;
        padding: 0 1rem;

        .button {
          &.is-text {
            color: $white;
            text-decoration: none;
            margin-left: -.75rem;

            &:active,
            &:focus {
              color: $white;
              background-color: rgba($white, 0.35);
            }
          }
        }
      }
    }
  }
</style>
