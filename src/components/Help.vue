<template>
  <div class="help-block">
    <div v-if="isText" class="text">
      Si tens qualsevol dubte o suggeriment, pots <a href="#" @click.prevent="toggleForm">contactar-nos</a>.
    </div>
    <div v-else>
      <b-tooltip label="Ajuda i suggeriments" position="is-left" type="is-dark">
        <b-button type="is-text" icon-left="question-circle" size="is-large" class="help-block-button" @click="toggleForm"></b-button>
      </b-tooltip>
    </div>

    <b-modal :active.sync="formIsActive" scroll="keep">
      <div class="content">
        <div v-if="template">
          <h1>{{ template.name }}</h1>
          <component :is="template.components.help" class="help-block-content" />
          <hr>
        </div>
        <help-form />
      </div>
    </b-modal>
  </div>
</template>

<script>
import HelpForm from './HelpForm'

export default {
  name: 'help',

  components: {
    HelpForm
  },

  props: {
    isText: Boolean
  },

  data () {
    return {
      formIsActive: false
    }
  },

  computed: {
    template () {
      return this.$store.state.template
    }
  },

  methods: {
    toggleForm () {
      this.formIsActive = !this.formIsActive
      this.$emit('modalOpen', this.formIsActive)
    }
  },

  watch: {
    '$route': function () {
      this.formIsActive = false
    }
  }
}
</script>

<style lang="scss">
  @import '../sass/variables';

  .help-block {
    h1 {
      font-size: 2.5rem;
    }

    .text {
      font-size: 1rem;
    }

    &-content {
      font-size: 1rem;

    }

    &-button {
      display: flex;
      align-items: center;
      opacity: .5;
      transition: .25s ease-in-out;
      padding: 0 .5rem !important;
      font-size: 1rem !important;

      &:hover {
        opacity: 1;
        background: transparent !important;
      }
    }

    .help-examples {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin: 0 -1rem;

      img {
        margin: 1rem;
        border: 1px $gray-900 solid;
        max-height: 450px;
      }
    }

    .modal-content {
      background: $white;
      border-radius: 1rem;
      padding: 0 1rem 0 0;

      .content {
        padding: 3rem;
        max-height: 100%;
        overflow: scroll;

        @include scrollbar;
      }
    }
  }

  @media (max-width: $xs-breakpoint) {
    .help-block {
      .help-examples {
        img {
          max-width: 80%;
        }
      }

      .modal-content {
        padding: 0;

        .content {
          padding: 1rem;
        }
      }
    }
  }
</style>
