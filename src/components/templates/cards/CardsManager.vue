<template>
  <fieldset class="c-field cards-manager">
    <legend class="c-field-info">Targetes</legend>

    <ul class="cards">
      <li v-for="(card, i) in cards" :key="card.id">
        <div :class="['card', `card-type-${card.type}`]">
          <!-- Card type -->
          <c-select label="Tipus" :name="`type-${card.id}`" v-model="card.type" class="card-type">
            <option value="emoji">Emoji</option>
            <option value="number">Xifra</option>
            <option value="text">Text</option>
          </c-select>

          <!-- Card col span -->
          <c-select label="Columnes" :name="`colspan-${card.id}`" v-model="card.colspan" class="card-colspan">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </c-select>

          <!-- Card row span -->
          <c-select label="Files" :name="`rowspan-${card.id}`" v-model="card.rowspan" class="card-rowspan">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </c-select>

          <!-- Card number -->
          <c-input-text
            v-if="card.type !== 'number'"
            label="Xifra"
            :name="`number-${card.id}`"
            placeholder="600€"
            v-model="card.number"
            :maxlength="10"
            class="card-number" />

          <!-- Card text -->
          <c-input-text
            v-if="card.type === 'text'"
            label="Text"
            :name="`number-${card.id}`"
            placeholder="Noves ajudes"
            v-model="card.number"
            :maxlength="34"
            class="card-number" />

          <!-- Card emoji -->
          <cards-emoji-picker
            v-if="card.type === 'emoji'"
            v-model="card.emoji"
            class="card-emoji" />

          <!-- Card text -->
          <c-input-text
            type="textarea"
            label="Text"
            :name="`text-${card.id}`"
            placeholder="Per cada treballador/a a jornada completa"
            v-model="card.text"
            :maxlength="maxLength(card)"
            class="card-text" />
        </div>

        <div class="card-actions">
          <button class="c-button-circle remove" @click="removeCard(i)">-</button>
          <button class="c-button-circle move-up" v-if="i !== 0" @click="moveUp(i)">↑</button>
          <button class="c-button-circle move-down" v-if="i !== cards.length - 1" @click="moveDown(i)">↓</button>
        </div>
      </li>
    </ul>

    <button v-if="cellCount < maxCards" @click="addCard" class="c-button">
      <font-awesome-icon :icon="['far', 'plus']" style="margin-right: .5rem" />
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
    },

    cellCount () {
      return this.cards.reduce((sum, { colspan, rowspan }) => sum + colspan * rowspan, 0)
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
        rowspan: 1,
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
    },

    maxLength (card) {
      const cells = card.colspan * card.rowspan
      const min = 50
      const max = 450
      const maxCells = 9
      return Math.round(min + (cells - 1) * ((max - min) / (maxCells - 1)))
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  $border-color: $gray-300;
  $border-radius: .5rem;

  .card {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    border: 1px $border-color solid;
    box-shadow: none;
    border-radius: $border-radius;
    margin: 1rem;
    padding: 0;

    &-type-emoji {
      .card-text {
        grid-column: span 9 / span 9;
        border-left: 1px $border-color solid;
      }
    }

    &-type-number {
      .card-text {
        border-bottom-left-radius: $border-radius;
      }
    }

    &-type {
      grid-column: span 4 / span 4;
      border-top-left-radius: $border-radius;
    }

    &-colspan {
      grid-column: span 4 / span 4;
      border-left: 1px $border-color solid;
    }

    &-rowspan {
      grid-column: span 4 / span 4;
      border-left: 1px $border-color solid;
      border-top-right-radius: $border-radius;
    }

    &-emoji {
      grid-column: span 3 / span 3;
      border-bottom: 0;
    }

    &-number {
      grid-column: span 12 / span 12;
    }

    &-text {
      grid-column: span 12 / span 12;
      border-bottom: 0;
      border-bottom-right-radius: $border-radius;
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

  .cards li {
    position: relative;

    &:hover .card-actions {
      display: block;
    }
  }
</style>
