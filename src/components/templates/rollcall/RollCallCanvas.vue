<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      'banner-background-' + banner.mode,
      'logo-' + banner.logo
    ]"
    v-if="banner">
    <div class="banner-title" v-if="banner.title">
      {{ banner.title }}
    </div>
    <emojis-on-canvas v-model="banner.emojis" />
    <banner-frame />
    <banner-picture :picture-position="objectPosition" />
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin'
import BannerPicture from '@/components/canvas/BannerPicture'
import BannerFrame from '@/components/canvas/BannerFrame'
import EmojisOnCanvas from '@/components/canvas/EmojisOnCanvas'

export default {
  name: 'roll-call-canvas',

  mixins: [CanvasMixin],

  components: {
    EmojisOnCanvas,
    BannerPicture,
    BannerFrame
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .banner-title {
    position: relative;
    z-index: 40;
    color: $white;
    grid-column: span 3;
    font-size: 42px;
    font-weight: bold;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

</style>
