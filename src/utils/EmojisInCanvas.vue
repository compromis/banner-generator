<template>
  <div>
    <drr
      v-for="(emoji, i) in value"
      :key="i"
      :x="emoji.x"
      :y="emoji.y"
      :w="emoji.width"
      :h="emoji.height"
      :angle="emoji.angle"
      :aspectRatio="true"
      @change="(newProps) => updateEmoji(newProps, i)"
      :class="{ 'emoji-front': emoji.pos === 'front', 'emoji-back': emoji.pos === 'back' }">
      <span v-html="emoji.tag"></span>
      <div class="emoji-tools">
        <b-tooltip label="Darrere del text" type="is-dark">
          <b-button @click="position('back', i)" size="is-small" icon-right="send-backward" :type="emoji.pos === 'back' ? 'is-primary' : ''"></b-button>
        </b-tooltip>
        <b-tooltip label="Davant del text" type="is-dark">
          <b-button @click="position('front', i)" size="is-small" icon-right="bring-forward" :type="emoji.pos === 'front' ? 'is-primary' : ''"></b-button>
        </b-tooltip>
        <b-button @click="remove(i)" size="is-small" type="is-danger" icon-right="times"></b-button>
      </div>
  </drr>
  </div>
</template>

<script>
import drr from '@minogin/vue-drag-resize-rotate'

export default {
  name: 'emojis-in-canvas',

  components: {
    drr
  },

  props: {
    value: Array
  },

  methods: {
    updateEmoji (newProps, i) {
      this.value[i].x = newProps.x
      this.value[i].y = newProps.y
      this.value[i].width = newProps.w
      this.value[i].height = newProps.h
      this.value[i].angle = newProps.angle
    },

    position (pos, i) {
      this.value[i].pos = pos
    },

    remove (i) {
      this.value.splice(i, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .emoji-front {
    z-index: 100;
  }

  .emoji-back {
    z-index: 25;
  }

  .emoji-tools {
    .button {
      margin-right: .25rem;
    }
  }
</style>
