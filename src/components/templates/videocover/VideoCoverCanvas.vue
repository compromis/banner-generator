<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      'border-' + banner.frameColor,
      'text-pos-' + banner.textPos,
      { 'hide-frame': !banner.showFrame }
    ]"
    v-if="banner">
    <div class="background-image images-pitted-against" v-if="banner.pitAgainst">
      <div class="image-left">
        <img :src="banner.picturePreview" alt="Imatge 1" v-if="banner.picturePreview" :style="objectPosition" />
      </div>
      <div class="image-right">
        <img :src="banner.pitAgainstPicturePreview" alt="Imatge 2" v-if="banner.pitAgainstPicturePreview" :style="pitAgainstObjectPosition" />
      </div>
    </div>
    <div class="background-image" v-else>
      <img :src="banner.picturePreview" alt="Imatge" v-if="banner.picturePreview" :style="objectPosition" />
    </div>
    <div class="text" :style="{ alignItems: banner.textPos, justifyContent, textAlign: banner.textAlign }">
      <div v-if="banner.fontStyle === 'regular'" class="text-wrapper" :style="{ fontSize: fontSizeSecondary }">
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
      <div v-if="banner.fontStyle === 'condensed'" class="text-wrapper-condensed">
        <div class="text-secondary" v-if="banner.textSecondary" :style="{fontSize: fontSizeSecondary, color: banner.textSecondaryColor}">
          {{ $options.filters.formatString(banner.textSecondary) }}
        </div>
        <div class="text-primary" v-if="banner.text" :style="{fontSize: fontSizePrimary, color: banner.textColor}">
          {{ $options.filters.formatString(banner.text) }}
        </div>
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
    fontSizePrimary () {
      const { aspect, banner, fontSize, fontStyle } = this
      const sizes = {
        regular: {
          11: { min: 54, max: 86 },
          916: { min: 32, max: 60 },
          event: { min: 36, max: 54 }
        },
        condensed: {
          11: { min: 54, max: 86 },
          916: { min: 32, max: 60 },
          event: { min: 36, max: 54 }
        }
      }

      return fontSize(banner.text, sizes[fontStyle][aspect].max, sizes[fontStyle][aspect].min, 40, banner.textSize)
    },

    fontSizeSecondary () {
      const size = parseInt(this.fontSizePrimary, 10) * 0.5
      return size + 'px'
    },

    justifyContent () {
      const values = { left: 'flex-start', center: 'center', right: 'flex-end' }
      return values[this.banner.textAlign]
    },

    pitAgainstObjectPosition () {
      const objectPosition = (this.banner.pitAgainstPictureAspect === 'vertical')
        ? '0% ' + (100 - this.banner.pitAgainstPicturePos) + '%'
        : (100 - this.banner.pitAgainstPicturePos) + '% 0%'
      return { objectPosition }
    }
  }
}

</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  @font-face {
    font-family: 'Fixture';
    font-style: normal;
    font-weight: 800;
    src: url(./fixture-cdn-bd.ttf) format('truetype');
  }

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

      &-condensed {
        font-family: 'Fixture';
      }
    }

    &-secondary {
      margin-bottom: 0.5em;
    }
  }

  .careta {
    position: absolute;
    top: 60px;
    left: 55px;
    width: 80px;
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

    &.images-pitted-against {
      background: $white;

      [class^='image-'] {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 62%;
      }

      .image-left {
        left: -13px;
        clip-path: polygon(0 0, 100% 0, 65% 100%, 0% 100%);
      }

      .image-right {
        right: -13px;
        clip-path: polygon(35% 0, 100% 0, 100% 100%, 0% 100%);
      }
    }
  }

  .border-black {
    background: linear-gradient($gray-darkest, $gray-darkest);
  }

  .border-orange {
    background: $gradient;
  }

  .border-white {
    background: $white;
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
      width: 70px;
    }

    &.text-pos-flex-start .careta {
      bottom: 40px;
      top: unset;
    }
  }

  .aspect-916 {
    .text {
      height: 379px;
      top: 50%;
      left: 15px;
      right: 15px;
      transform: translateY(-50%);
      padding: 13px;
      box-sizing: border-box;
    }

    .background-image {
      height: 391px;
      top: 50%;
      left: 15px;
      right: 15px;
      transform: translateY(-50%);
      border-radius: 10px;

      &.images-pitted-against {
        .image-left {
          left: -12px;
        }

        .image-right {
          right: -5px;
        }
      }
    }

    .careta {
      top: 176px;
      left: 25px;
      width: 55px;
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
