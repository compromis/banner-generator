<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      'mode-' + banner.mode,
      'banner-background-' + banner.mode,
      banner.invertOrder && 'comparison-inverted'
    ]"
    v-if="banner">
    <div class="comparison">
      <div class="comparison-item comparison-before" :style="beforeGradientColor">
        <div class="background">
          <img v-if="pictureBefore" :src="pictureBefore" alt="" :style="objectPositionBefore" />
        </div>
        <div class="card">
        <div :class="['first-source', 'first-source--custom']" v-if="banner.firstSource === 'other'" :style="{color: banner.firstSourceCustomColor}">
          {{ banner.customFirstSource }}
        </div>
        <div class="first-source" v-else-if="banner.firstSource" >
          <img :src="banner.firstSource.logo" :alt="banner.firstSource.name" :style="{ height: banner.firstSource.logoHeight + 'px' }" />
        </div>
          <h1 class="card-text" :style="banner.firstSource && banner.firstSource !== 'other' ? {fontFamily: banner.firstSource.font.fontFamily, lineHeight: banner.firstSource.font.lineHeight} : null" contenteditable><span :style="{ fontSize: smallestFontSize }">{{ banner.textBefore | formatString }}</span></h1>
        </div>
      </div>
      <div class="comparison-item comparison-after">
        <div class="background">
          <img v-if="pictureAfter" :src="pictureAfter" alt="" :style="objectPositionAfter" />
        </div>
        <div class="card">
          <div :class="['second-source', 'second-source--custom']" v-if="banner.secondSource === 'other'" :style="{color: banner.secondSourceCustomColor}">
          {{ banner.customSecondSource }}
        </div>
        <div class="second-source" v-else-if="banner.secondSource" >
          <img :src="banner.secondSource.logo" :alt="banner.secondSource.name" :style="{ height: banner.secondSource.logoHeight + 'px' }" />
        </div>
          <h1 class="card-text" :style="banner.secondSource && banner.secondSource !== 'other' ? {fontFamily: banner.secondSource.font.fontFamily, lineHeight: banner.secondSource.font.lineHeight} : null" contenteditable><span :style="{ fontSize: smallestFontSize }">{{ banner.textAfter | formatString }}</span></h1>
        </div>
      </div>
    </div>
    <emojis-on-canvas v-model="banner.emojis" />
    <div v-if="banner.comparisonMode !== 'none'" class="comparison-mode">
      <span v-if="banner.comparisonMode === 'arrow'">↓</span>
      <span v-else style="fontSize: 78px">vs</span>
    </div>
    <banner-frame />
    <div class="gradient-background"></div>
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin'
import EmojisOnCanvas from '@/components/canvas/EmojisOnCanvas'
import BannerFrame from '@/components/canvas/BannerFrame'

export default {
  name: 'comparison-canvas-party',
  mixins: [CanvasMixin],
  components: {
    EmojisOnCanvas,
    BannerFrame
  },
  computed: {
    pictureBefore () {
      return this.banner.beforePictureBlob || this.banner.beforePicturePreview
    },
    pictureAfter () {
      return this.banner.afterPictureBlob || this.banner.afterPicturePreview
    },
    objectPositionAfter () {
      return this.computeObjectPosition('after')
    },
    objectPositionBefore () {
      return this.computeObjectPosition('before')
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
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 6px;
    --banner-padding: 24px;
    &-item {
      position: relative;
      .background {
        position: absolute;
        inset: 0;
        display: flex;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        &::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: linear-gradient(var(--gradient-orientation, 120deg), var(--gradient-color), transparent);
        }
      }
      .card {
        position: absolute;
        top: var(--banner-padding);
        left: var(--banner-padding);
        max-width: 350px;
        max-height: 200px;
        overflow: hidden;
        line-height: 1.25;
        z-index: 40;
      }
    }

    &-before {
      .card {
        &-party {
          margin-top: -4px;
          margin-bottom: 8px;
        }
      }
    }

    &-after {
      .card {
        top: auto;
        left: auto;
        bottom: var(--banner-padding);
        right: var(--banner-padding);
        text-align: right;
        white-space: pre-wrap;
        margin-bottom: 56px;
      }
    }

    &-mode {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
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
      font-weight: bold;
      z-index: 40;

      span {
        transform: translateY(-5px);
      }
    }
  }

  .mode-black {
    --circle-bg: #{$white};
    --circle-text: #{$gray-900};

    .card {
      background: $gray-900;
      color: $white;
    }

    .first-source img, .second-source img {
      filter: grayscale(100%) brightness(0) invert(1);
    }
  }

  .first-source--custom, .second-source--custom {
    margin-bottom: 4px;
    font-size: 22px;
    font-weight: bold;
  }

  .first-source, .second-source {
    margin-bottom: 6px;
  }

  .gradient-background {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 225px;
    background: url(../../../assets/gradients/gradient-partial.png);
    background-size: 100% 100%;
  }
</style>
