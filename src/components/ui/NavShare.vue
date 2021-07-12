<template>
  <div class="nav-share">
    <c-dropdown name="user" class="share-dropdown" label="Comparteix" icon="link" is-ghost>
      <div class="share-dropdown-window">
        <h2><font-awesome-icon class="mr-2" :icon="['far', 'link']" />Enllaç per a col·laborar</h2>
        <div class="share-link">
          <input type="text" @focus="$event.target.select()" :value="url"/>
          <b-button :class="['mr-0', { 'success': copied }]" tag="a" @click="copyUrl">
              <span v-if="!copied">Copia</span>
              <span v-else-if="copied">Copiat!</span>
          </b-button>
        </div>
        <p>Qualsevol persona amb aquest enllaç pot editar la tarja amb el generador. Dues persones no poden estar editant la mateixa tarja a la vegada.</p>
      </div>
    </c-dropdown>
  </div>
</template>

<script>
import CDropdown from './CDropdown.vue'

export default {
  components: {
    CDropdown
  },

  data () {
    return {
      copied: false
    }
  },

  computed: {
    url () {
      return window.location.href
    }
  },

  methods: {
    copyUrl () {
      navigator.clipboard.writeText(this.url)
      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 4000)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../sass/variables";

  .nav-share {
    display: flex;
    align-items: center;
  }

  .share-dropdown {
    margin: -.75rem;

    &-window {
      padding: .75rem;
      width: 400px;

      h2 {
        font-size: 1.25rem;
      }

      p {
        font-size: .95rem;
        color: $gray-700;
      }

      .share-link {
        display: flex;
        margin: 1rem 0;

        input {
          width: 75%;
          background: $gray-100;
          border: none;
          border-radius: .5rem;
          margin-right: .5rem;
          padding: 0 .5rem;

          &:focus {
            box-shadow: $focus-shadow;
            outline: none;
          }
        }

        .button {
          width: 25%;
        }

        .button.success {
          color: $green;
          border-color: $green;

          &:hover {
            background: lighten($green, 40%);
          }
        }
      }
    }
  }

  @media (max-width: $xs-breakpoint) {
    .nav-share::v-deep .c-dropdown-list {
      position: fixed;
      left: 1rem;
      right: 1rem;
    }
  }
</style>
