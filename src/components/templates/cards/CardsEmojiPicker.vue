<template>
  <div class="c-field emoji-picker">
    <twemoji-picker
      :pickerWidth="260"
      :pickerHeight="220"
      :emojiData="emojiAllData"
      :emojiGroups="emojiGroups"
      :skinsSelection="true"
      :recentEmojisFeat="true"
      :searchEmojisFeat="true"
      recentEmojisStorage="local"
      twemojiExtension=".svg"
      twemojiFolder="svg"
      @emojiImgAdded="addEmoji">
      <template v-slot:twemoji-picker-button>
        <button class="c-button">
          <div v-html="value" />
        </button>
      </template>
    </twemoji-picker>
  </div>
</template>

<script>
import { TwemojiPicker } from '@kevinfaguiar/vue-twemoji-picker'
import emojiAllData from '@kevinfaguiar/vue-twemoji-picker/emoji-data/es/emoji-all-groups.json'
import emojiGroups from '@kevinfaguiar/vue-twemoji-picker/emoji-data/emoji-groups.json'

export default {
  name: 'emoji-picker',

  components: {
    TwemojiPicker
  },

  props: {
    value: Array
  },

  data () {
    return {
      emojiAllData,
      emojiGroups
    }
  },

  methods: {
    addEmoji (tag) {
      this.$emit('input', tag)
    }
  }
}
</script>

<style lang="scss">
  @import "../../../sass/variables";

  .emoji-picker {
    button {
      background: $white;
    }

    .emojis {
      background: $white;

      li {
        display: grid;
        grid-template-columns: 22px 1fr auto auto;
        gap: .25rem;
        border-bottom: 1px $gray-200 solid;
        padding: .75rem $field-padding;
        align-content: center;

        .emoji-img {
          display: flex;
          align-content: center;
        }

        img {
          display: block;
          margin: 0;
        }
      }
    }
  }

  // Restyle picker component
  #popper-button,
  #popper-button .button {
    width: 100%;
  }

  #popper-container {
    background: $white !important;
    box-shadow: $default-shadow;
    border: 0 !important;
  }

  #emoji-container > #emoji-popup {
    padding: 0 !important;
  }

  #emoji-container > #emoji-popup > #emoji-popover-header {
    border-bottom: 1px $gray-200 solid;
    padding: 7px 5px !important;

    @include scrollbar();
  }

  #emoji-container > #emoji-popup .emoji-popover-inner {
    background: $white !important;
    @include scrollbar();
  }

  #emoji-container > #emoji-popup .emoji-popover-inner > div > .emoji-list > span {
    display: inline-block;
  }

  #emoji-container > #emoji-popup img.emoji {
    width: 22px !important;
    height: 22px !important;
  }

  #arrow::before {
    background: $white !important;
    border-bottom: 1px $gray-200 solid;
    border-right: 1px $gray-200 solid;
  }

  [data-popper-placement="bottom-start"] #arrow::before {
    border: 0;
    border-top: 1px $gray-200 solid;
    border-left: 1px $gray-200 solid;
  }

  #emoji-popover-search {
    background-color: white;
    border-radius: 0;
    margin: 0;
  }

  #emoji-container > #emoji-popup #emoji-popover-search > #search-header {
    border-bottom: 1px solid $gray-200;
    border-radius: 0;
  }

  #emoji-container > #emoji-popup #emoji-popover-search > #search-header > span {
    padding: 8px 10px;
  }

  #emoji-container > #emoji-popup #emoji-popover-search > #search-header > input {
    margin: 0;
  }
</style>
