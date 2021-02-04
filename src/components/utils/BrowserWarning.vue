<template>
  <b-modal class="browser-warning" :active.sync='isModalActive'>
    <div class="card content">
        <b-icon icon="exclamation-triangle" size="is-large" />
        <h2>Atenció</h2>
        <p>
          Es possible que el teu navegador <strong>no siga compatible</strong> amb aquesta aplicació.
          La ferramenta només està pensada per a ser gastada amb les últimes versions
          de <strong>Chrome o Edge</strong>.
          Recomanem que empres els navegadors compatibles.
        </p>
        <b-button ref="confirm" type="is-primary" @click="isModalActive = false">Entés</b-button>
      </div>

  </b-modal>
</template>

<script>
import browser from 'browser-detect'

export default {
  name: 'browser-warning',

  data () {
    return {
      isModalActive: true
    }
  },

  created () {
    const result = browser()

    if (result.name === 'chrome' && result.versionNumber > 80) {
      this.isModalActive = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .browser-warning {
    position: fixed;
    top: 0;
    left: 0;
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
</style>
