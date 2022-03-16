<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      'mode-' + banner.mode,
      banner.invertOrder && 'comparison-inverted'
    ]"
    v-if="banner">
    <div class="comparison">
      <div class="comparison-item comparison-before" :style="beforeGradientColor">
        <div class="background">
          <img v-if="pictureBefore" :src="pictureBefore" alt="" :style="objectPositionBefore" />
        </div>
        <div class="card">
          <div class="card-party card-party--custom" v-if="banner.source === 'other'" :style="{ color: banner.customSourceColor }">
            {{ banner.customSource }}
          </div>
          <div class="card-party card-party--image" v-else-if="banner.source" >
            <img :src="banner.source.logo" :alt="banner.source.name" :style="{ height: banner.source.logoHeight + 'px' }" />
          </div>
          <h1 class="card-text" :style="{ fontSize: smallestFontSize }" contenteditable>{{ banner.textBefore | formatString }}</h1>
        </div>
      </div>
      <div class="comparison-item comparison-after">
        <div class="background">
          <img v-if="pictureAfter" :src="pictureAfter" alt="" :style="objectPositionAfter" />
        </div>
        <div class="card">
          <div class="compromis-logo">
            <multi-logo :type="banner.mode === 'black' ? 'auto' : 'color'" />
          </div>
          <h1 class="card-text" :style="{ fontSize: smallestFontSize }" contenteditable>{{ banner.textAfter | formatString }}</h1>
        </div>
      </div>
    </div>
    <emojis-on-canvas v-model="banner.emojis" />
    <div v-if="banner.comparisonMode !== 'none'" class="comparison-mode">
      <span v-if="banner.comparisonMode === 'arrow'">↓</span>
      <span v-else style="fontSize: 78px">vs</span>
    </div>
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin'
import MultiLogo from '@/components/canvas/MultiLogo'
import EmojisOnCanvas from '@/components/canvas/EmojisOnCanvas'

export default {
  name: 'compare-party-canvas-blobless',

  mixins: [CanvasMixin],

  components: {
    MultiLogo,
    EmojisOnCanvas
  },

  computed: {
    pictureBefore () {
      return this.banner.beforePictureBlob || this.banner.beforePicturePreview
    },
    pictureAfter () {
      return this.banner.afterPictureBlob || this.banner.afterPicturePreview
    },
    objectPositionAfter () {
      const objectPosition = (this.banner.afterPictureAspect === 'vertical')
        ? '0% ' + (100 - this.banner.afterPicturePos) + '%'
        : (100 - this.banner.afterPicturePos) + '% 0%'
      return { objectPosition }
    },
    objectPositionBefore () {
      const objectPosition = (this.banner.beforePictureAspect === 'vertical')
        ? '0% ' + (100 - this.banner.beforePicturePos) + '%'
        : (100 - this.banner.beforePicturePos) + '% 0%'
      return { objectPosition }
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
        line-height: 1.25;
        z-index: 40;
        background: var(--card-bg, #{$white});
        color: var(--card-text, #{$gray-900});
        overflow: hidden;
      }
    }

    &-before {
      .card {
        &-party {
          margin-top: -4px;
          margin-bottom: 8px;

          &--custom {
            font-size: 20px;
            font-weight: bold;
          }
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
      }
      .background::before {
        --gradient-orientation: 315deg;
        background: $trans-gradient;
      }
      .compromis-logo {
        margin-top: 0;
        margin-bottom: 8px;
        svg {
          height: 30px;
        }
      }
    }

    &-inverted {
      .comparison-before {
        grid-row: 2;
        .card {
          top: auto;
          left: auto;
          right: var(--banner-padding);
          bottom: var(--banner-padding);
          text-align: right;
        }
        .background::before {
          --gradient-orientation: 300deg;
        }
      }
      .comparison-after {
        grid-row: 1;
        .card {
          top: var(--banner-padding);
          left: var(--banner-padding);
          right: auto;
          bottom: auto;
          text-align: left;
        }
        .background::before {
          --gradient-orientation: 145deg;
        }
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

      span {
        transform: translateY(-5px);
      }
    }
  }

  .mode-black {
    --card-bg: #{$gray-800};
    --card-text: #{$white};
    --circle-bg: #{$white};
    --circle-text: #{$gray-900};

    background: $gray-900;

    .card-party--custom {
      color: $white !important;
    }

    .card-party--image {
      filter: grayscale(1) invert(1) brightness(100);
    }
  }
</style>
