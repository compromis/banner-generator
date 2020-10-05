<template>
  <footer :class="{ 'modal-open': modalIsOpen, 'columns': true }">
    <div class="column is-four-fifths">
      <help is-text @modalOpen="(open) => modalIsOpen = open" />
      <strong>Generador de Targes</strong> 2.0 és una aplicació desenvolupada pel <strong>Departament de Comunicació</strong> de <strong>Compromís</strong>.
    </div>
    <div class="column is-one-fifths has-text-right">
      <b-switch size="is-small" @input="(show) => $emit('archive', show)">Arxiu</b-switch>
    </div>
  </footer>
</template>

<script>
import Help from './Help'

export default {
  name: 'app-footer',

  data () {
    return {
      modalIsOpen: false
    }
  },

  components: {
    Help
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
