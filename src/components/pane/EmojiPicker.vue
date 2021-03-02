<template>
  <div class="c-field emoji-picker">
    <ul class="emojis">
      <li v-for="(emoji, i) in value" :key="i">
        <span v-html="emoji.tag" class="emoji-img"></span>
        <b-tooltip label="Darrere del text" type="is-dark" style="margin-left: auto">
          <b-button @click="position('back', i)" size="is-small" icon-right="send-backward" :type="emoji.pos === 'back' ? 'is-primary' : ''"></b-button>
        </b-tooltip>
        <b-tooltip label="Davant del text" type="is-dark">
          <b-button @click="position('front', i)" size="is-small" icon-right="bring-forward" :type="emoji.pos === 'front' ? 'is-primary' : ''"></b-button>
        </b-tooltip>
        <b-button @click="remove(i)" size="is-small" type="is-danger" icon-right="times"></b-button>
      </li>
    </ul>
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
        <button class="c-button">😉Afegeix emojis</button>
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
      const x = Math.floor(Math.random() * 520) + 100
      const y = Math.floor(Math.random() * 520) + 100
      const size = Math.floor(Math.random() * 100) + 100
      this.value.push({ tag, pos: 'front', x, y, width: size, height: size, angle: 0 })
    },

    remove (i) {
      this.value.splice(i, 1)
    },

    position (pos, i) {
      this.value[i].pos = pos
    }
  }
}
</script>

<style lang="scss">
  @import "../../sass/variables";
  @import "../../sass/emojipicker";

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
</style>
