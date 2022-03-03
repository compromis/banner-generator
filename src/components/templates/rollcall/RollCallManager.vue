<template>
  <fieldset class="c-field roll-call-manager">
    <legend class="c-field-info">Partits</legend>

    <ul class="parties">
      <li v-for="(party, i) in parties" :key="i">
        <div class="party">
          <!-- Party -->
          <c-select label="Partit" :name="`partyselect-${i}`" v-model="party.party" class="party-select" :disabled="i === 0">
            <template v-for="preset in presets">
              <option v-if="notInList(preset, party)" :key="preset.id" :value="preset">{{ preset.name }}</option>
            </template>
            <option value="custom">Altre...</option>
          </c-select>

          <!-- Custom -->
          <div class="party-custom" v-if="party.party === 'custom'">
            <div class="party-color">
              <swatches v-model="party.color"></swatches>
            </div>
            <c-input-text
              type="text"
              label="Nom"
              :name="`partycustomname-${i}`"
              placeholder="Nom del partit"
              class="party-name"
              v-model="party.name"
              :maxlength="48" />
          </div>

          <!-- Party -->
          <c-select label="Vot" :name="`partyvoted-${i}`" v-model="party.voted" class="party-voted">
            <option value="for">🟢 A favor</option>
            <option value="against">🔴 En contra</option>
            <option value="abstain">🟡 Abstenció</option>
          </c-select>

          <!-- Card number -->
          <c-input-text
            label="Vots"
            type="number"
            :name="`partyvotes-${i}`"
            placeholder="3"
            v-model="party.votes"
            class="party-votes" />
        </div>

        <div class="party-actions">
          <button class="c-button-circle remove" @click="removeCard(i)">-</button>
        </div>
      </li>
    </ul>

    <button @click="addCard" class="c-button">
      <font-awesome-icon :icon="['far', 'plus']" style="margin-right: .5rem" />
      Afegeix partit
    </button>
  </fieldset>
</template>

<script>
import presets from './parties.js'
import Swatches from 'vue-swatches'
import CSelect from '@/components/pane/CSelect'
import CInputText from '@/components/pane/CInputText.vue'

export default {
  name: 'roll-call-manager',

  components: {
    CSelect,
    CInputText,
    Swatches
  },

  data () {
    return {
      presets
    }
  },

  props: {
    value: {
      type: Array,
      required: true
    }
  },

  computed: {
    parties: {
      get () {
        return this.value
      },

      set (value) {
        this.$emit('input', value)
      }
    }
  },

  methods: {
    addCard () {
      this.parties.push({
        party: null,
        voted: null,
        votes: '0'
      })
    },

    removeCard (i) {
      this.parties.splice(i, 1)
    },

    notInList (thisParty, selected) {
      const selectedPartyId = selected.party ? selected.party.id : 'custom'
      if (thisParty.id === selectedPartyId) return true
      return this.parties.filter(party => party.party && party.party.id === thisParty.id).length === 0
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  $border-color: $gray-300;
  $border-radius: .5rem;

  .party {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    border: 1px $border-color solid;
    box-shadow: none;
    border-radius: $border-radius;
    margin: 1rem;
    padding: 0;

    &-select {
      grid-column: span 2 / span 2;
    }

    &-voted {
      grid-column: span 1 / span 1;
      border-bottom: 0;
      border-right: 1px $border-color solid;
    }

    &-custom {
      grid-column: span 2 / span 2;
      display: flex;
    }

    &-votes {
      grid-column: span 1 / span 1;
      border-bottom: 0;
      border-bottom-right-radius: $border-radius;
    }

    &-name {
      flex-grow: 1;
    }

    &-color {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1.5rem;
      padding: .5rem;
      border-bottom: 1px $border-color solid;
      border-right: 1px $border-color solid;
      flex-shrink: 0;

      &::v-deep .vue-swatches__trigger {
        max-height: 2rem !important;
        width: 2rem !important;
        height: 2rem !important;
      }
    }

    &-actions {
      display: none;
      position: absolute;
      top: 1rem;
      right: .5rem;

      button {
        margin-bottom: .5rem;
      }
    }
  }

  .parties li {
    position: relative;

    &:hover .party-actions {
      display: block;
    }
  }
</style>
