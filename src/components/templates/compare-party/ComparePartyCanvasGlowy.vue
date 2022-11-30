<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      aspect === '11' || banner.card ? 'disposition-' + banner.disposition : '',
      banner.invertOrder ? 'comparison--inverted' : '',
      'banner-background-' + banner.mode
    ]"
    v-if="banner">
    <div :class="['comparison-images', banner.invertOrder ? 'comparison-images--inverted' : '']">
      <banner-picture
        :picture="banner.beforePictureBlob || banner.beforePicturePreview"
        :picture-position="backgroundPositionBefore"
        :style="beforeGradientColor"
        :height="600"
        color="custom"
        class="banner-picture-before"
        glow-size="sm" />
      <banner-picture
        :picture="banner.afterPictureBlob || banner.afterPicturePreview"
        :picture-position="backgroundPositionAfter"
        :style="{'--gradient-orientation' : '0deg'}"
        :height="600"
        color="orange"
        class="banner-picture-after"
        glow-size="sm" />
    </div>
    <div :class="['before-party', 'before-party--custom']" v-if="banner.source === 'other'" :style="{color: banner.customSourceColor}">
      {{ banner.customSource }}
    </div>
    <div class="before-party" v-else-if="banner.source" >
      <img :src="banner.source.logo" :alt="banner.source.name" :style="{ height: banner.source.logoHeight + 'px' }" />
    </div>
    <div class="comparison">
      <div class="comparison-text comparison-text-before"
        :style="{
          fontSize: smallestFontSize
        }">
        {{ banner.textBefore | formatString }}
      </div>
      <div class="comparison-text comparison-text-after"
        :style="{
          fontSize: smallestFontSize
        }">
        {{ banner.textAfter | formatString }}
      </div>
    </div>
    <banner-frame
      theme="glowy"
      :mode="banner.mode"
      :hashtag="banner.hashtag"
      :local-label="banner.localLabel"
      :logo-align="banner.invertOrder ? 'left' : 'right'"
      :logo="banner.logo" />
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'
import BannerPicture from '@/components/canvas/BannerPicture'
import BannerFrame from '@/components/canvas/BannerFrame'

export default {
  name: 'compare-party-canvas-glowy',

  mixins: [CanvasMixin],

  components: {
    BannerFrame,
    BannerPicture
  },

  computed: {
    backgroundPositionAfter () {
      return this.computeBackgroundPosition('after')
    },
    backgroundPositionBefore () {
      return this.computeBackgroundPosition('before')
    },
    smallestFontSize () {
      const before = this.fontSize(this.banner.textBefore, 40, 25, 160, this.banner.textSize)
      const after = this.fontSize(this.banner.textAfter, 40, 25, 160, this.banner.textSize)
      return before < after ? before : after
    },
    beforeGradientColor () {
      const { banner } = this
      if (!banner.source) return
      return {
        '--gradient-color': banner.source === 'other'
          ? banner.customSourceColor
          : banner.source['color']
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .comparison {
    display: flex;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 30;
    font-family: $family-primary;
    font-weight: 700;
    transition: all .5s ease-in-out;

    &-images {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 30px;
      align-items: stretch;
      position: absolute;
      padding: 30px;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;

      .banner-picture-before {
        align-self: end;
        --gradient-orientation: 180deg;
      }
    }

    &-text {
      line-height: 1.1;
      word-wrap: break-word;
      width: 265px;
      padding: 16px;
      position: absolute;
      letter-spacing: -.5px;
      color: $white;

      &-before {
        top: 90px;
        left: 35px;
      }

      &-after {
        bottom: 90px;
        right: 45px;
      }
    }

    &--inverted {
      .banner-picture-before {
        grid-row: 1;
        grid-column: 2;
        --gradient-orientation: 180deg;
      }

      .banner-picture-after {
        grid-row: 1;
        grid-column: 1;
        --gradient-orientation: 180deg;
      }

      .before-party {
        right: 35px;
        left: unset;
      }

      .comparison-text {
        &-after {
          bottom: 90px;
          left: 35px;
          right: auto;
          top: auto;
        }

        &-before {
          top: 90px;
          right: 45px;
          bottom: auto;
          left: auto;
        }
      }
    }
  }

  .banner-picture::v-deep .glowy-subject,
  .banner-picture::v-deep .glowy-ghost  {
    min-width: unset;
  }

  .before-party {
    z-index: 20;
    position: absolute;
    top: 25px;
    left: 35px;

    &--custom {
      margin-bottom: 4px;
      font-size: 24px;
      color: $white;
      font-weight: bold;
    }
  }

  .banner-background-black .before-party {
    filter: grayscale(1) invert(1) brightness(100);
  }
</style>
