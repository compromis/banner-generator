<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="['banner-canvas', 'aspect-' + aspect]"
    v-if="banner">
    <div :class="['grid', 'layout-' + banner.layout, 'bg-txt-' + banner.bgColor]">
      <div class="text">
        <h1 :style="{ fontSize: fontSizePrimary }">{{ $options.filters.formatString(banner.text) }}</h1>
        <multi-logo class="logo" v-if="aspect !== '916'" />
      </div>
      <div class="picture" :style="{ backgroundImage: `url(${bannerPicture})`, ...backgroundPosition }" />
    </div>
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin'
import MultiLogo from '@/components/canvas/MultiLogo'

export default {
  mixins: [CanvasMixin],

  components: {
    MultiLogo
  },

  computed: {
    bannerPicture () {
      return this.banner.pictureBlob || this.banner.picturePreview
    },

    fontSizePrimary () {
      const { aspect, banner, fontSize } = this
      const sizes = {
        11: { min: 55, max: 100 },
        45: { min: 45, max: 90 },
        916: { min: 45, max: 70 },
        169: { min: 45, max: 60 }
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
  }

  .layout {
    &-right {
      grid-template-columns: 1.4fr 1fr;
      grid-template-areas: "text picture";
    }

    &-top,
    &-bottom {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
    }

    &-top {
      grid-template-areas: "picture" "text";
    }

    &-bottom {
      grid-template-areas: "text" "picture";
    }
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

  .logo {
    margin-top: auto;
  }

  .picture {
    grid-area: picture;
    background-color: $gray-300;
  }

  .banner-aspect-169 {
    .grid {
      grid-template-columns: 1.25fr 1fr;
      grid-template-rows: 1fr;
      grid-template-areas: "text picture";
    }
  }

  .banner-aspect-916 {
    .layout-bottom {
      .text {
        padding-top: 70px;
      }
    }

    .layout-top {
      .text {
        padding-bottom: 66px;
      }
    }
  }

  .banner-aspect-916,
  .banner-aspect-45 {
    .grid {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
    }
  }
</style>
