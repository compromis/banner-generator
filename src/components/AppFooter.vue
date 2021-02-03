<template>
  <footer :class="{ 'modal-open': showSettings || showHelp, 'columns': true }">
    <div class="column is-four-fifths">
      <help is-text @modalOpen="(open) => showHelp = open" />
      <strong>Generador de Targes</strong> 2.0 és una aplicació desenvolupada pel <strong>Departament de Comunicació</strong> de <strong>Compromís</strong>.
    </div>
    <div class="column is-one-fifths">
      <app-settings @modalOpen="(open) => showSettings = open" />
    </div>
  </footer>
</template>

<script>
import AppSettings from './AppSettings'
import Help from './Help'

export default {
  name: 'app-footer',

  components: {
    AppSettings,
    Help
  },

  data () {
    return {
      showHelp: false,
      showSettings: false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../sass/variables';

  footer {
    color: $gray-700;
    padding: 1rem;
    backdrop-filter: blur(4px);
    background-color: rgba($body-background-color, .75);
    border-radius: .5rem;
    margin: 1rem;
    margin-top: 2rem;

    strong {
      color: $gray-700;
    }

    &.modal-open {
      backdrop-filter: none; // Fixes weird bug when modal is open
    }
  }

  @media (max-width: $xs-breakpoint) {
    footer {
      background: rgba($white, .75);
      backdrop-filter: blur(4px);
      margin-top: 2rem;
    }
  }
</style>
