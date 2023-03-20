<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="['banner-canvas', 'aspect-' + aspect]"
    v-if="banner">
    <div :class="['grid', 'layout-' + banner.layout, 'bg-txt-' + banner.bgColor]">
      <div class="text" :style="{ fontSize: fontSizePrimary }">
        <div class="quote-glyph">“</div>
        <h1 class="quote-text">{{ $options.filters.formatString($options.filters.formatSentence(banner.text)) }}</h1>
        <div class="author">{{ banner.author }}</div>
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
        11: { min: 48, max: 65 },
        45: { min: 38, max: 70 },
        916: { min: 30, max: 60 },
        169: { min: 30, max: 50 }
      }

      return fontSize(banner.text, sizes[aspect].max, sizes[aspect].min, 100, banner.textSize)
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
      grid-template-columns: 1.2fr 1fr;
      grid-template-areas: "text picture";
    }

    &-top,
    &-bottom {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;

      .author {
        font-size: 18px;
      }

      .quote-text {
        font-size: 0.9em;
      }

      .quote-glyph {
        font-size: 2em;
      }
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
      font-size: inherit;
    }
  }

  .author {
    font-size: 22px;
    font-weight: 900;
    margin-top: 14px;
    white-space: pre-wrap;
    color: $white;
  }

  .quote-glyph {
    font-size: 2.5em;
    font-family: $granissat-font;
    line-height: 0.25;
    margin-top: 30px;
  }

  .logo {
    margin-top: auto;
    padding-top: 28px;
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

    .quote-glyph {
      font-size: 80px;
    }

    .author {
      font-size: 18px;
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
