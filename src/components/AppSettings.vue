<template>
  <div class="settings">
    <div class="has-text-right settings-button">
      <b-button @click="toggleModal" icon-left="cog" size="is-small" rounded>Opcions</b-button>
    </div>
    <b-modal :active.sync="modalOpen" scroll="keep">
      <div class="content">
        <h3>Opcions</h3>
        <ul class="options">
          <li><b-switch v-model="showArchive">Mostrar plantilles arxivades</b-switch></li>
          <li><b-switch v-model="showLogoSelector">Mostrar logos de partits</b-switch></li>
          <li v-if="isAdmin"><b-switch v-model="transparentMode">Descarrega amb fons transparent</b-switch></li>
        </ul>
        <b-button @click="modalOpen = false">Tanca</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      modalOpen: false
    }
  },

  computed: {
    showArchive: {
      get () {
        return this.$store.state.settings.showArchive
      },
      set (value) {
        this.$store.commit('updateSettings', { prop: 'showArchive', value })
      }
    },
    showLogoSelector: {
      get () {
        return this.$store.state.settings.showLogoSelector
      },
      set (value) {
        this.$store.commit('updateSettings', { prop: 'showLogoSelector', value })
      }
    },

    transparentMode: {
      get () {
        return this.$store.state.settings.transparentMode
      },

      set (value) {
        this.$store.commit('updateSettings', { prop: 'transparentMode', value })
      }
    },

    isAdmin () {
      return this.$store.state.auth.user.role === 'admin'
    }
  },

  methods: {
    toggleModal () {
      this.modalOpen = !this.modalOpen
      this.$emit('modalOpen', this.modalOpen)
    }
  },

  watch: {
    '$route': function () {
      this.modalOpen = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../sass/variables';

  .settings {
    &::v-deep .modal-content {
      background: $white;
      border-radius: 1rem;
      padding: 0 1rem 0 0;
      max-width: 500px !important;

      .content {
        padding: 2rem 2rem 1rem 2rem;
        max-height: 100%;
        overflow: scroll;
        margin: 0 !important;

        @include scrollbar;
      }
    }

    .options {
      margin: 1.5rem 0;
      padding: 0;
      list-style: none;
      flex-direction: column;
    }

    &-button .button {
      font-size: .85rem;
    }
  }
</style>
