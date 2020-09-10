<template>
  <div
    v-if="banner"
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      'disposition-' + banner.disposition,
      { 'theme-glowy': theme === 'glowy' },
      { 'theme-blobs': theme === 'blobs' }
    ]">
    <banner-picture
      :picture="banner.picturePreview"
      :picture-position="objectPosition"
      :theme="theme"
      :edge="aspect === '916'" />
    <headline-card
      :theme="theme"
      :headline="banner.headline"
      :source="banner.source"
      :customSource="banner.customSource"
      :customSourceColor="banner.customSourceColor"
      :fontSize="aspect === '11' ? fontSize(banner.headline, 50, 30, 160) : fontSize(banner.headline, 35, 23.5, 160)"/>
    <emojis-on-canvas v-model="banner.emojis" />
    <banner-frame
      :theme="theme"
      :hashtag="banner.hashtag"
      :localLabel="banner.localLabel"
      :aspect="aspect" />
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'
import BannerPicture from '@/utils/BannerPicture'
import BannerFrame from '@/utils/BannerFrame'
import EmojisOnCanvas from '@/utils/EmojisOnCanvas'
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
      left: 20px;
      right: 20px;
  }

  /* Blobs theme */
  .theme-blobs {
    /* Banner on bottom */
    &.disposition-0 {
      .headline {
        bottom: 90px;
        top: auto;
      }
    }

    /* Banner on bottom */
    &.disposition-1 {
      .headline {
        top: 90px;
        bottom: auto;
      }
    }
  }

  /* Glowy theme */
  .theme-glowy {
    /* Banner on bottom */
    &.disposition-0 {
      .headline {
        bottom: 90px;
        top: auto;
      }
    }

    /* Banner on top */
    &.disposition-1 {
      .headline {
        top: 35px;
        bottom: auto;
      }
    }

    /* Story */
    &.aspect-916 {
      .banner-picture::v-deep .glowy-card {
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 540px;
      }
    }

    /* Glowy card */
    .banner-picture::v-deep .glowy-card {
      position: absolute;
      z-index: 20;
      left: 40px;
      right: 40px;
      top: 70px;
      bottom: 150px;
    }
  }
</style>
