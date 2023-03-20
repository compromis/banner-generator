<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="['banner-canvas', 'aspect-' + aspect]"
    v-if="banner">
    <div :class="['grid', 'bg-txt-' + banner.bgColor]">
      <div class="text">
        <h1 :style="{ fontSize: fontSizePrimary }">{{ banner.text }}</h1>
      </div>
      <div class="picture" :style="{ backgroundImage: `url(${bannerPicture})`, ...backgroundPosition }" />
    </div>
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin'

export default {
  mixins: [CanvasMixin],

  computed: {
    bannerPicture () {
      return this.banner.pictureBlob || this.banner.picturePreview
    },

    fontSizePrimary () {
      const { aspect, banner, fontSize } = this
      const sizes = {
        11: { min: 55, max: 100 },
        916: { min: 40, max: 50 },
        event: { min: 45, max: 60 }
      }

      return fontSize(banner.text, sizes[aspect].max, sizes[aspect].min, 70, banner.textSize)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../../sass/variables";
  @import "../resources/fonts";
  @import "../resources/colors";

  .grid {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: grid;
    grid-template-rows: 2fr 1fr;
    grid-template-columns: 1fr;
    grid-template-areas:
      "picture"
      "text";
  }

  .text {
    grid-area: text;
    display: flex;
    flex-direction: column;
    padding: 28px;

    h1 {
      font-family: $granissat-font;
      line-height: 1;
      white-space: pre-wrap;
    }
  }

  .picture {
    grid-area: picture;
    background-color: $gray-300;
  }

  .aspect-916 {
    .grid {
      grid-template-rows: 157.5px 2fr 1fr 157.5px;
      grid-template-areas:
        "picture"
        "picture"
        "text"
        "empty";
    }
  }

  .aspect-event {
    .grid {
      grid-template-columns: 1.25fr 1fr;
      grid-template-rows: 1fr;
      grid-template-areas: "picture text";
    }
  }
</style>
