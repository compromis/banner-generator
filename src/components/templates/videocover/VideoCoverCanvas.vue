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
          :text="$options.filters.formatString(banner.textSecondary)"
          :font-size="fontSizeSecondary"
          :pill-style="banner.textSecondaryColor"
          :text-align="banner.textAlign"
          :width="550" />
        <text-in-pills
          v-if="banner.text"
          :text="$options.filters.formatString(banner.text)"
          :font-size="fontSizePrimary"
          :pill-style="banner.textColor"
          :text-align="banner.textAlign"
          :width="550" />
      </div>
    </div>
    <emojis-on-canvas v-model="banner.emojis" />
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'
import TextInPills from '@/components/canvas/TextInPills'
import EmojisOnCanvas from '@/components/canvas/EmojisOnCanvas'

export default {
  name: 'video-cover-canvas',

  mixins: [CanvasMixin],

  components: {
    TextInPills,
    EmojisOnCanvas
  },

  computed: {
    justifyContent () {
      const values = { left: 'flex-start', center: 'center', right: 'flex-end' }
      return values[this.banner.textAlign]
    },

    fontSizePrimary () {
      const { aspect, banner, fontSize } = this
      return aspect === '11'
        ? fontSize(banner.text, 80, 40, 70, banner.textSize)
        : fontSize(banner.text, 70, 30, 70, banner.textSize)
    },

    fontSizeSecondary () {
      const { aspect, banner, fontSize } = this
      return aspect === '11'
        ? fontSize(banner.text, 40, 30, 70, banner.textSize)
        : fontSize(banner.text, 35, 25, 70, banner.textSize)
    }
  }
}

</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .text {
    display: flex;
    position: absolute;
    top: 80px;
    bottom: 80px;
    left: 65px;
    right: 65px;
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
    top: 30px;
    left: 30px;
    bottom: 30px;
    right: 30px;
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
      top: 55px;
      bottom: 55px;
      left: 50px;
      right: 50px;
    }

    .background-image {
      top: 25px;
      bottom: 25px;
      left: 25px;
      right: 25px;
      border-radius: 15px;
    }
  }
</style>
