<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      'theme-' + banner.theme,
      'banner-background-' + banner.mode,
      'logo-' + banner.logo
    ]"
    v-if="banner">
    <div class="text" :style="{ alignItems: banner.textPos, textAlign: banner.textAlign }">
      <div class="text-wrapper">
        <text-in-pills
          v-if="banner.text"
          :text="$options.filters.formatString(banner.text)"
          :pill-style="banner.textColor"
          :text-align="banner.textAlign"
          :font-size="fontSizePrimary"
          :width="820"
          :transparent="banner.theme === 'blobless' && banner.fullGradient"
          shadow />
        <text-in-pills
          class="secondary-text"
          v-if="banner.secondaryText && banner.hasSecondaryText"
          :text="$options.filters.formatString(banner.secondaryText)"
          :pill-style="secondaryTextColor"
          :text-align="banner.textAlign"
          :font-size="fontSizeSecondary"
          :width="820"
          :transparent="banner.theme === 'blobless' && banner.fullGradient"
          shadow />
      </div>
    </div>
    <emojis-on-canvas v-model="banner.emojis" />
    <banner-frame />
    <banner-picture
      :picture-position="objectPosition"
      :height="aspect === '11' ? 500 : aspect === '169' ? 285 : null"
      :width="aspect === '916' ? 405 : null" />
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin'
import BannerPicture from '@/components/canvas/BannerPicture'
import BannerFrame from '@/components/canvas/BannerFrame'
import EmojisOnCanvas from '@/components/canvas/EmojisOnCanvas'
import TextInPills from '@/components/canvas/TextInPills'

export default {
  name: 'generic-canvas',

  mixins: [CanvasMixin],

  components: {
    EmojisOnCanvas,
    TextInPills,
    BannerPicture,
    BannerFrame
  },

  computed: {
    fontSizePrimary () {
      const { aspect, banner, fontSize } = this
      const sizes = {
        11: { min: 35, max: 60 },
        916: { min: 25, max: 50 },
        169: { min: 30, max: 55 }
      }

      return fontSize(banner.text, sizes[aspect].max, sizes[aspect].min, 100, banner.textSize)
    },

    fontSizeSecondary () {
      const size = parseInt(this.fontSizePrimary, 10) * 0.5
      return size + 'px'
    },

    secondaryTextColor () {
      const translations = {
        black: 'white',
        white: 'black',
        orange: 'white'
      }
      return translations[this.banner.textColor]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .text {
    display: flex;
    position: absolute;
    top: 35px;
    bottom: 105px;
    left: 70px;
    right: 70px;
    z-index: 30;
    transition: all .5s ease-in-out;

    &-wrapper {
      width: 100%;
    }
  }

  .secondary-text {
    margin-top: 24px;
  }

  .aspect-916 .text {
      left: 20px;
      right: 20px;
  }

  .theme-blobs {
    .text {
      top: 175px;
      bottom: 160px;
      left: 70px;
      right: 70px;
    }

    &.aspect-916 .text {
      left: 25px;
      right: 25px;
    }

    &.aspect-169 .text {
      top: 65px;
      bottom: 95px;
    }
  }

  /* Glowy theme */
  .theme-glowy {
    /* Glowy card */
    .banner-picture::v-deep .glowy-card {
      position: absolute;
      z-index: 20;
      left: 40px;
      right: 40px;
      top: 70px;
    }

    /* Story */
    &.aspect-916 {
      .text {
        top: 100px;
        left: 20px;
        right: 20px;
        bottom: 100px;
      }

      .banner-picture {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }

      .banner-picture::v-deep .glowy-card {
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: var(--width);
        height: var(--height);
      }

      &.disposition-1 {
        .text {
          top: 55px;
        }
      }
    }

    /* Twitter */
    &.aspect-169 {
      .text {
        top: 25px;
        bottom: 95px;
      }

      .banner-picture::v-deep .glowy-card {
        top: 30px;
        left: 30px;
        right: 30px;
      }
    }
  }

  /* Blobless theme */
  .theme-blobless {
    .text {
      top: 80px;
      left: 60px;
      right: 60px;
      bottom: 130px;
    }

    &.aspect-916 {
      .text {
        left: 25px;
        right: 25px;
      }
    }

    &.aspect-169 {
      .text {
        top: 65px;
        bottom: 95px;
      }
    }
  }
</style>
