<template>
  <div :id="'bannerCanvas' + aspect" :class="['banner-canvas', 'aspect-' + aspect, 'theme-glowy']" v-if="banner">
    <banner-picture
      :picture="banner.picturePreview"
      :picture-position="objectPosition"
      :theme="banner.card ? 'glowy' : 'blobs'" />
    <headline-card
      :theme="banner.card ? 'glowy' : 'blobs'"
      :headline="banner.headline"
      :source="banner.source"
      :customSource="banner.customSource"
      :customSourceColor="banner.customSourceColor"
      :fontSize="aspect === '11' ? fontSize(banner.headline, 50, 30, 160) : fontSize(banner.headline, 35, 23.5, 160)"/>
    <emojis-on-canvas v-model="banner.emojis" />
    <banner-frame
      :theme="banner.card ? 'glowy' : 'blobs'"
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
    bottom: 90px;
    top: auto;
  }

  .theme-glowy {
    .banner-picture {
      position: absolute;
      z-index: 30;
      left: 40px;
      right: 40px;
      top: 90px;
    }
  }
</style>
