<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect
    ]"
    v-if="banner">
    <div :class="['background-frame', `frame-${banner.frameColor}`]"></div>
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
          :text-align="banner.textAlign" />
        <text-in-pills
          v-if="banner.text"
          :text="banner.text"
          :font-size="fontSizePrimary"
          :pill-style="banner.textColor"
          :text-align="banner.textAlign" />
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
    top: 80px;
    bottom: 80px;
    left: 65px;
    right: 65px;
    transition: all .5s ease-in-out;

    &-wrapper {
      position: relative;
      z-index: 30;
      max-width: 80%;
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

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .background-frame {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 5;
    border: 30px solid white;
    box-sizing: border-box;
    z-index: 40;
    pointer-events: none;

    &.frame-black {
      border-color: $gray-darkest;
    }

    &.frame-orange {
      border-image-slice: 1;
      border-image-source: $gradient;
    }

    &.frame-white {
      border-color:  $white;
    }
  }

  .banner-aspect-event {
    .text {
      top: 55px;
      bottom: 55px;
      left: 50px;
      right: 50px;
    }

    .background-frame {
      border-width: 25px;
    }

    .background-image {
      top: 25px;
      bottom: 25px;
      left: 25px;
      right: 25px;
    }
  }
</style>
