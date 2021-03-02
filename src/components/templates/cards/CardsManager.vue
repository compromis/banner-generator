<template>
  <fieldset class="c-field cards-manager">
    <legend class="c-field-info">Targetes</legend>

    <ul class="cards">
      <li v-for="(card, i) in cards" :key="card.id">
        <div class="card">
          <c-select label="Tipus" name="tipus" v-model="card.type">
            <option value="emoji">Emoji</option>
            <option value="number">Xifra</option>
          </c-select>

          <c-select label="Columnes" name="tipus" v-model="card.colspan">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </c-select>

          <c-input-text
            v-if="card.type === 'number'"
            label="Xifra"
            name="number"
            placeholder="20.000€"
            v-model="card.number"
            :maxlength="14" />

          <!-- Emoji picker -->
          <cards-emoji-picker v-if="card.type === 'emoji'" v-model="card.emoji" />

          <c-input-text
            label="Text"
            name="text"
            placeholder="Text"
            v-model="card.text"
            :maxlength="48" />
        </div>

        <button class="card-option-button" @click="removeCard(i)">-</button>
        <button class="card-option-button" v-if="i !== 0" @click="moveUp(i)">↑</button>
        <button class="card-option-button" v-if="i !== cards.length - 1" @click="moveDown(i)">↓</button>
      </li>
    </ul>

    <button v-if="cards.length < maxCards" @click="addCard" class="c-button">
      <font-awesome-icon :icon="['far', 'plus']" />
      Nova targeta
    </button>
  </fieldset>
</template>

<script>
import CSelect from '@/components/pane/CSelect'
import CInputText from '@/components/pane/CInputText.vue'
import CardsEmojiPicker from './CardsEmojiPicker'

export default {
  name: 'cards-manager',

  components: {
    CSelect,
    CInputText,
    CardsEmojiPicker
  },

  data () {
    return {
      maxCards: 9
    }
  },

  props: {
    value: {
      type: Array,
      required: true
    }
  },

  computed: {
    cards: {
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
      this.cards.push({
        id: Date.now(),
        type: 'emoji',
        number: '',
        emoji: null,
        text: '',
        colspan: 1,
        dark: false
      })
    },

    removeCard (i) {
      this.cards.splice(i, 1)
    },

    moveUp (i) {
      this.cards.splice(i - 1, 0, this.cards.splice(i, 1)[0])
    },

    moveDown (i) {
      this.cards.splice(i + 1, 0, this.cards.splice(i, 1)[0])
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .card {
    border: 1px $gray-300 solid;
    box-shadow: none;
    border-radius: .5rem;
    margin: .5rem 1rem;
    padding: 0;
  }
</style>
