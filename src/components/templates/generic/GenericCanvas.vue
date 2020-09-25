<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      'disposition-' + banner.disposition,
      'theme-' + banner.theme
    ]"
    v-if="banner">
    <div class="text" v-if="banner.text" :style="{ alignItems: banner.textPos, textAlign: banner.textAlign }">
      <text-in-pills
        v-if="banner.text"
        :text="$options.filters.formatString(banner.text)"
        :pill-style="banner.textColor"
        :text-align="banner.textAlign"
        :font-size="fontSizePrimary"
        :width="820"
        shadow />
    </div>
    <emojis-on-canvas v-model="banner.emojis" />
    <banner-frame
      :theme="banner.theme"
      :hashtag="banner.hashtag"
      :local-label="banner.localLabel"
      :aspect="aspect"
      :color="banner.color" />
    <banner-picture
      :picture="banner.picturePreview"
      :picture-position="objectPosition"
      :picture-dimensions="banner.pictureDimensions"
      :height="aspect === '11' ? 500 : null"
      :width="aspect === '916' ? 405 : null"
      :theme="banner.theme"
      :color="banner.color" />
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
      return aspect === '11'
        ? fontSize(banner.text, 60, 35, 110, banner.textSize)
        : fontSize(banner.text, 50, 25, 110, banner.textSize)
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
        top: 90px;
        left: 20px;
        right: 20px;
        bottom: 90px;
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
  }
</style>
