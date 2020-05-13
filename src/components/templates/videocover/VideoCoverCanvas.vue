<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      'border-' + banner.frameColor
    ]"
    v-if="banner">
    <div class="background-image">
      <img :src="banner.picturePreview" alt="Imatge" v-if="banner.picturePreview" :style="objectPosition" />
    </div>
    <div class="text" :style="{ alignItems: banner.textPos, justifyContent, textAlign: banner.textAlign }">
      <div class="text-wrapper" :style="{ fontSize: fontSizeSecondary }">
        <text-in-pills
          class="text-secondary"
          v-if="banner.textSecondary"
          :text="banner.textSecondary"
          :font-size="fontSizeSecondary"
          :pill-style="banner.textSecondaryColor"
          :text-align="banner.textAlign"
          :width="450" />
        <text-in-pills
          v-if="banner.text"
          :text="banner.text"
          :font-size="fontSizePrimary"
          :pill-style="banner.textColor"
          :text-align="banner.textAlign"
          :width="450" />
      </div>
    </div>
    <emojis-in-canvas v-model="banner.emojis" />
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'
import TextInPills from '@/utils/TextInPills'
import EmojisInCanvas from '@/utils/EmojisInCanvas'

export default {
  name: 'video-cover-canvas',

  mixins: [CanvasMixin],

  components: {
    TextInPills,
    EmojisInCanvas
  },

  computed: {
    justifyContent () {
      const values = { left: 'flex-start', center: 'center', right: 'flex-end' }
      return values[this.banner.textAlign]
    },

    fontSizePrimary () {
      const { aspect, banner, fontSize } = this
      return aspect === '11'
        ? fontSize('text', 80, 40, 70, banner.textSize)
        : fontSize('text', 70, 30, 70, banner.textSize)
    },

    fontSizeSecondary () {
      const { aspect, banner, fontSize } = this
      return aspect === '11'
        ? fontSize('text', 40, 30, 70, banner.textSize)
        : fontSize('text', 35, 25, 70, banner.textSize)
    }
  }
}

</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .text {
    display: flex;
    position: absolute;
    top: 85px;
    bottom: 85px;
    left: 70px;
    right: 70px;
    transition: all .5s ease-in-out;

    &-wrapper {
      position: relative;
      z-index: 30;
      max-width: 450px;
    }

    &-secondary {
      margin-bottom: 0.5em;
    }
  }

  .background-image {
    position: absolute;
    top: 35px;
    left: 35px;
    bottom: 35px;
    right: 35px;
    z-index: 10;
    background: $gray-300;
    pointer-events: none;
    border-radius: 20px;
    overflow: hidden;
    transition: .15s ease-in-out;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .border-black {
    background: $gray-darkest;
  }

  .border-orange {
    background: $gradient;
  }

  .border-white {
    background:  $white;
  }

  .banner-aspect-event {
    .text {
      top: 60px;
      bottom: 60px;
      left: 55px;
      right: 55px;
    }

    .background-image {
      top: 30px;
      bottom: 30px;
      left: 30px;
      right: 30px;
      border-radius: 15px;
    }
  }
</style>
