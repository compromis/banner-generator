<template>
  <div class="nav">
    <div class="nav-back">
      <b-button ref="close" icon-left="chevron-left" type="is-text" @click="$emit('back', false)" class="back-button">
        Enrere
      </b-button>
      <b-button ref="download" icon-left="arrow-to-bottom" type="is-primary" @click="download" class="download-button is-hidden-tablet">
        Descarrega
      </b-button>
    </div>
    <p class="nav-centered">{{ templateName }}</p>
    <b-modal :active="isCardModalActive" @close="$emit('hide', true)" :width="640" scroll="keep">
      <div class="card content">
        <b-icon icon="exclamation-triangle" size="is-large" />
        <h2>Atenció</h2>
        <p>
          Vols tancar l'editor i tornar a la pantalla d'escollir tarja?
          Es perdran tots els canvis.
        </p>
        <b-button ref="confirm" type="is-primary" @click="$emit('back', true)">Si, tanca</b-button>
        <b-button type="is-light" @click="$emit('hide', true)">No, continua editant</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { EventBus } from '@/event-bus'

export default {
  name: 'app-nav',

  props: {
    isCardModalActive: Boolean,
    templateName: String
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
  },

  methods: {
    download () {
      EventBus.$emit('download')
    }
  }
}
</script>

<style lang="scss">
  @import "../sass/variables";

  .nav {
    display: flex;
    color: $white;
    background-color: $gray-800;
    padding: .25rem 2rem;

    .back-button {
      margin-left: -.75rem;
    }

    .download-button {
      margin-left: auto;
    }

    .button {
      &.is-text {
        color: $white;
        text-decoration: none;
        transition: .2s ease-in-out;

        &:hover {
          background-color: rgba($white, 0.15);
          color: $white;
          text-decoration: none;
        }

        &:active,
        &:focus {
          color: $white;
          background-color: rgba($white, 0.35);
        }
      }

      .icon {
        transition: .2s ease-in-out;
      }

      &:hover {
        .icon {
          transform: translateX(-3px);
        }
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

    &-back {
      width: 21rem;
      flex-shrink: 0;
    }

    &-centered {
      display: flex;
      align-items: center;
      justify-content: center;
      justify-self: center;
      width: 100%;
      text-align: center;
    }
  }

  @media (max-width: $xs-breakpoint) {
    .nav {
      padding: .25rem 1rem;

      &-back {
        display: flex;
        width: 100%;
      }

      &-centered {
        display: none;
      }

      .card {
        margin: 0 1rem;
        padding: 1.25rem;
      }
    }
  }
</style>
