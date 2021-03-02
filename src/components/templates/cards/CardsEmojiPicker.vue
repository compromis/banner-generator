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
        <c-field label="Emoji" edge focusable>
          <button class="c-button emoji-picker-button">
            <div v-if="value" v-html="value" />
            <div v-else>
              <img src="https://twemoji.maxcdn.com/2/svg/1f9d1-200d-1f3eb.svg" class="placeholder-emoji" />
            </div>
          </button>
        </c-field>
      </template>
    </twemoji-picker>
  </div>
</template>

<script>
import CField from '@/components/pane/CField'
import { TwemojiPicker } from '@kevinfaguiar/vue-twemoji-picker'
import emojiAllData from '@kevinfaguiar/vue-twemoji-picker/emoji-data/es/emoji-all-groups.json'
import emojiGroups from '@kevinfaguiar/vue-twemoji-picker/emoji-data/emoji-groups.json'

export default {
  name: 'emoji-picker',

  components: {
    CField,
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
  @import "../../../sass/emojipicker";

  .emoji-picker {
    .c-field {
      border-bottom: 0;
      border-bottom-left-radius: .5rem;

      &:hover {
        background: $gray-100;
      }

      &:focus-within {
        background: $gray-200;
      }
    }

    &-button {
      display: flex;
      justify-content: center;
      align-items: center;
      background: $white;
      height: 7rem;
      border-bottom-left-radius: .5rem;

      img {
        display: block;
        width: 1.5rem;
        margin-top: -.75rem;
      }

      .placeholder-emoji {
        opacity: .5;
      }
    }
  }
</style>
