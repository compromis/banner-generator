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
    <div class="comparison-images">
      <banner-picture
        :picture="banner.beforePicturePreview"
        :picture-position="objectPositionBefore"
        :style="{'--gradient-color': banner.firstSourceCustomColor, '--gradient-orientation': '90deg'}"
        :height="285"
        color="custom"
        class="banner-picture-before"
        glow-size="sm" />
      <banner-picture
        :picture="banner.afterPicturePreview"
        :picture-position="objectPositionAfter"
        :style="{'--gradient-color': banner.secondSourceCustomColor, '--gradient-orientation': '-90deg'}"
        :height="285"
        color="custom"
        class="banner-picture-after"
        glow-size="sm" />
    </div>
    <div class="comparison">
      <div class="comparison-description comparison-description-first">
        {{banner.firstDescription}}
      </div>
      <div class="comparison-text comparison-text-before"
        :style="{
          fontSize: smallestFontSize
        }">
        <div :class="['first-source', 'first-source--custom']" v-if="banner.firstSource === 'other'" :style="{color: banner.firstSourceCustomColor}">
          {{ banner.customFirstSource }}
        </div>
        <div class="first-source" v-else-if="banner.firstSource" >
          <img :src="banner.firstSource.logo" :alt="banner.firstSource.name" :style="{ height: banner.firstSource.logoHeight + 'px' }" />
        </div>
        <span :style="banner.firstSource && banner.firstSource !== 'other' ? {fontFamily: banner.firstSource.font.fontFamily, lineHeight: banner.firstSource.font.lineHeight} : null">{{ banner.textBefore | formatString }}</span>
      </div>
      <div class="comparison-description comparison-description-second">
        {{banner.secondDescription}}
      </div>
      <div class="comparison-text comparison-text-after"
        :style="{
          fontSize: smallestFontSize
        }">
        <div :class="['second-source', 'second-source--custom']" v-if="banner.secondSource === 'other'" :style="{color: banner.secondSourceCustomColor}">
          {{ banner.customSecondSource }}
        </div>
        <div class="second-source" v-else-if="banner.secondSource" >
          <img :src="banner.secondSource.logo" :alt="banner.secondSource.name" :style="{ height: banner.secondSource.logoHeight + 'px' }" />
        </div>
        <span :style="banner.secondSource && banner.secondSource !== 'other' ? {fontFamily: banner.secondSource.font.fontFamily, lineHeight: banner.secondSource.font.lineHeight} : null" >{{ banner.textAfter | formatString }}</span>
      </div>
      <div v-if="banner.comparisonMode !== 'none'" class="comparison-mode">
        <span v-if="banner.comparisonMode === 'arrow'">↓</span>
        <span v-else style="fontSize: 78px">vs</span>
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
  mixins: [CanvasMixin],

  components: {
    BannerFrame,
    BannerPicture
  },

  computed: {
    objectPositionAfter: function () {
      const objectPosition = (this.banner.afterPictureAspect === 'vertical')
        ? '0% ' + (100 - this.banner.afterPicturePos) + '%'
        : (100 - this.banner.afterPicturePos) + '% 0%'
      return { objectPosition }
    },
    objectPositionBefore: function () {
      const objectPosition = (this.banner.beforePictureAspect === 'vertical')
        ? '0% ' + (100 - this.banner.beforePicturePos) + '%'
        : (100 - this.banner.beforePicturePos) + '% 0%'
      return { objectPosition }
    },
    smallestFontSize () {
      const before = this.fontSize(this.banner.textBefore, 35, 18, 160, this.banner.textSize)
      const after = this.fontSize(this.banner.textAfter, 35, 18, 160, this.banner.textSize)
      return before < after ? before : after
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";
  @import "../headline/fonts";

  .banner-background-black {
    --circle-bg: #{$white};
    --circle-text: #{$gray-900};
  }

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
      grid-row-gap: 25px;
      align-content: start;
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
      width: 275px;
      padding: 16px;
      position: absolute;
      letter-spacing: -.5px;
      color: $white;

      &-before {
        bottom: 408px;
        left: 35px;
      }

      &-after {
        bottom: 96px;
        right: 38px;
        text-align: right;
      }
    }

    &-description {
      position: absolute;
      color: $white;
      font-size: 20px;

      &-first {
        top: 42px;
        left: 50px;
      }

      &-second {
        bottom: 340px;
        right: 50px;
        text-align: right;
      }
    }

    &-mode {
      position: absolute;
      bottom: 335px;
      left: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--circle-bg, #{$gray-800});
      color: var(--circle-text, #{$white});
      height: 120px;
      width: 120px;
      border-radius: 100%;
      font-size: 92px;

      span {
        transform: translateY(-5px);
      }
    }
  }

  .banner-picture::v-deep .glowy-subject,
  .banner-picture::v-deep .glowy-ghost  {
    min-width: unset;
  }

  .banner-picture::v-deep .glowy-card {
    min-height: unset;
  }

  .first-source, .second-source {
    z-index: 20;
    filter: grayscale(1) invert(1) brightness(100);

    &--custom {
      margin-bottom: 4px;
      font-size: 24px;
      color: $white;
      font-weight: bold;
    }
  }
</style>
