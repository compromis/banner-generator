<template>
  <div
    v-if="banner"
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      'disposition-' + banner.disposition,
      'theme-' + banner.theme
    ]">
    <banner-picture
      :picture="banner.picturePreview"
      :picture-position="objectPosition"
      :picture-dimensions="banner.pictureDimensions"
      :height="aspect === '11' ? 500 : 730"
      :theme="banner.theme"
      :edge="aspect === '916'"
      :color="banner.color"
      :full-gradient="banner.fullGradient" />
    <headline-card
      :theme="banner.theme"
      :headline="banner.headline"
      :source="banner.source"
      :custom-source="banner.customSource"
      :custom-source-color="banner.customSourceColor"
      :font-size="aspect === '11' ? fontSize(banner.headline, 50, 30, 160) : fontSize(banner.headline, 35, 23.5, 160)"/>
    <emojis-on-canvas v-model="banner.emojis" />
    <banner-frame
      :theme="banner.theme"
      :hashtag="banner.hashtag"
      :local-label="banner.localLabel"
      :aspect="aspect"
      :color="banner.color" />
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'
import BannerPicture from '@/components/canvas/BannerPicture'
import BannerFrame from '@/components/canvas/BannerFrame'
import EmojisOnCanvas from '@/components/canvas/EmojisOnCanvas'
import HeadlineCard from './HeadlineCard'

export default {
  name: 'headline-canvas',

  mixins: [CanvasMixin],

  components: {
    BannerPicture,
    BannerFrame,
    EmojisOnCanvas,
    HeadlineCard
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";
  @import "./fonts";

  .headline {
    position: absolute;
    z-index: 30;
    left: 40px;
    right: 40px;
  }

  .aspect-916 .headline {
      left: 10px;
      right: 10px;
  }

  /* Blobs theme */
  .theme-blobs {
    /* Banner on bottom */
    &.disposition-bottom {
      .headline {
        bottom: 90px;
        top: auto;
      }
    }

    /* Banner on top */
    &.disposition-top {
      .headline {
        top: 90px;
        bottom: auto;
      }
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

    /* Banner on bottom */
    &.disposition-bottom {
      .headline {
        bottom: 90px;
        top: auto;
      }
    }

    /* Banner on top */
    &.disposition-top {
      .banner-picture::v-deep .glowy-card {
        top: 120px;
      }

      .headline {
        top: 25px;
        bottom: auto;
      }
    }

    /* Story */
    &.aspect-916 {
      .headline {
        left: 5px;
        right: 25px;
      }

      .banner-picture::v-deep .glowy-card {
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 540px;
      }

      .headline::v-deep .headline-source {
        padding: 5px 8px;

        img {
          height: 20px;
        }
      }

      &.disposition-top {
        .headline {
          top: 75px;
        }
      }
    }
  }

  /* Blobless theme */
  .theme-blobless {
    /* Banner on bottom */
    &.disposition-bottom {
      .headline {
        bottom: 100px;
        top: auto;
      }
    }

    /* Banner on top */
    &.disposition-top {
      .headline {
        top: 85px;
        bottom: auto;
      }
    }
  }
</style>
