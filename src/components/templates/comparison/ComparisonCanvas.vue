<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      aspect === '11' || banner.card ? 'disposition-' + banner.disposition : '',
      banner.localLabel && banner.hasLocalLabel ? 'has-local-label' : '',
    ]"
    v-if="banner">
    <div class="comparison-images">
      <banner-picture
      :picture="banner.pictureBeforePreview"
      :picture-position="objectPosition"
      v-if="banner.pictureBeforePreview"
      :style="objectPositionBefore"
      :height="500"
      theme="glowy" />
      <banner-picture
      :picture="banner.pictureAfterPreview"
      :picture-position="objectPosition"
      v-if="banner.pictureAfterPreview"
      :style="objectPositionAfter"
      :height="500"
      theme="glowy" />
    </div>
    <div :class="['before-party--left', 'before-party--custom']" v-if="banner.source === 'other'" >
      {{ banner.customSource }}
    </div>
    <div :class="['before-party--left']" v-else-if="banner.source" >
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
      :hashtag="banner.hashtag"
      :local-label="banner.localLabel"
       />
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'
import BannerPicture from '@/utils/BannerPicture'
import BannerFrame from '@/utils/BannerFrame'

export default {
  name: 'comparison-canvas',

  mixins: [CanvasMixin],

  components: {
    BannerFrame,
    BannerPicture
  },

  computed: {
    objectPositionAfter: function () {
      const objectPosition = (100 - this.banner.pictureAfterPos) + '% 0%'
      return { objectPosition }
    },
    objectPositionBefore: function () {
      const objectPosition = (100 - this.banner.pictureBeforePos) + '% 0%'
      return { objectPosition }
    },
    smallestFontSize () {
      const before = this.fontSize(this.banner.textBefore, 45, 30, 160, this.banner.textSize)
      const after = this.fontSize(this.banner.textAfter, 45, 30, 160, this.banner.textSize)
      return before < after ? before : after
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
    }

    &-text {
      line-height: 1.1;
      word-wrap: break-word;
      width: 265px;
      padding: 16px;
      position: absolute;
      letter-spacing: -.5px;

      &-before {
        top: 90px;
        left: 30px;
      }

      &-after {
        bottom: 90px;
        right: 30px;
      }
    }
  }

  .before-party {
    z-index: 20;
    position: absolute;
    top: 25px;

    &--left {
      left: 35px;
    }

    &--right {
      right: 35px;
    }

    &--custom {
      margin-bottom: 4px;
      font-size: 24px;
      color: $white;
      font-weight: bold;
    }
  }

  .logo {
   color: white;
    z-index: 20;
  }

</style>
