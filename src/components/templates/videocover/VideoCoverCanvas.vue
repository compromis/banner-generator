<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      'border-' + banner.frameColor,
      'text-pos-' + banner.textPos,
      { 'hide-frame': banner.showFrame === false }
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
    <careta class="careta" />
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'
import TextInPills from '@/components/canvas/TextInPills'
import EmojisOnCanvas from '@/components/canvas/EmojisOnCanvas'
import Careta from '@/components/canvas/Careta'

export default {
  name: 'video-cover-canvas',

  mixins: [CanvasMixin],

  components: {
    TextInPills,
    EmojisOnCanvas,
    Careta
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
        : aspect === '916' ? fontSize(banner.text, 40, 16, 70, banner.textSize)
          : fontSize(banner.text, 60, 30, 70, banner.textSize)
    },

    fontSizeSecondary () {
      const { aspect, banner, fontSize } = this
      return aspect === '11'
        ? fontSize(banner.text, 40, 30, 70, banner.textSize)
        : aspect === '916' ? fontSize(banner.text, 18, 14, 70, banner.textSize)
          : fontSize(banner.text, 30, 25, 70, banner.textSize)
    }
  }
}

</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .text {
    display: flex;
    position: absolute;
    top: 75px;
    bottom: 75px;
    left: 60px;
    right: 60px;
    transition: all .5s ease-in-out;
    z-index: 30;

    &-wrapper {
      position: relative;
      max-width: 80%;
    }

    &-secondary {
      margin-bottom: 0.5em;
    }
  }

  .careta {
    position: absolute;
    top: 60px;
    left: 55px;
    width: 100px;
    z-index: 1000;
  }

  .text-pos-flex-start .careta {
    top: unset;
    bottom: 65px;
  }

  .background-image {
    position: absolute;
    top: 25px;
    left: 25px;
    bottom: 25px;
    right: 25px;
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

  .aspect-event {
    .text {
      top: 47px;
      bottom: 47px;
      left: 38px;
      right: 38px;
    }

    .background-image {
      top: 18px;
      bottom: 18px;
      left: 18px;
      right: 18px;
      border-radius: 14px;
    }

    .careta {
      top: 40px;
      left: 35px;
      width: 80px;
    }

    &.text-pos-flex-start .careta {
      bottom: 40px;
      top: unset;
    }
  }

  .aspect-916 {
    .text {
      height: 391px;
      top: 50%;
      left: 15px;
      right: 15px;
      transform: translateY(-50%);
      padding: 20px;
      box-sizing: border-box;
    }

    .background-image {
      height: 391px;
      top: 50%;
      left: 15px;
      right: 15px;
      transform: translateY(-50%);
      border-radius: 10px;
    }

    .careta {
      top: 176px;
      left: 25px;
      width: 65px;
    }

    &.text-pos-flex-start .careta {
      bottom: 175px;
      top: unset;
    }

    &.hide-frame {
      .background-image {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: auto;
        border-radius: 0;
        transform: unset;
      }
    }
  }
</style>
