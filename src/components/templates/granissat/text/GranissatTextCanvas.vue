<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="['banner-canvas', 'aspect-' + aspect, 'layout-' + banner.layout]"
    v-if="banner">
    <div :class="['grid', 'bg-' + banner.bgColor]">
      <div class="picture" :style="{ backgroundImage: `url(${bannerPicture})`, ...backgroundPosition }" />
      <div class="text">
        <div v-html="banner.text" class="text-wysiwyg"></div>
      </div>
      <div class="claim">
        Som molt<br>de tu.<br>Som molt<br>d'ací.
      </div>
      <div class="bottom">
        <multi-logo />
      </div>
    </div>
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'
import MultiLogo from '@/components/canvas/MultiLogo'

export default {
  mixins: [CanvasMixin],

  components: {
    MultiLogo
  },

  computed: {
    bannerPicture () {
      return this.banner.pictureBlob || this.banner.picturePreview
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

  .layout-top {
    .grid {
      grid-template-columns: 1fr;
      grid-template-rows: 1.5fr 1fr auto;
      grid-template-areas: "picture" "text" "bottom";
    }

    .claim {
      grid-area: picture;
    }
  }

  .layout-bottom {
    .grid {
      grid-template-columns: 1fr 2.5fr;
      grid-template-rows: auto 1fr 3fr;
      grid-template-areas:
        "bottom bottom"
        "text text"
        "claim picture";
    }

    .claim {
      grid-area: claim;
      align-self: end;
    }

    .text {
      padding-top: 0;
      font-size: 20px;
    }
  }

  .picture {
    grid-area: picture;
    background: $gray-300;
  }

  .text {
    grid-area: text;
    padding: 24px;
    color: $white;
    font-size: 24px;
    line-height: 1.25;
  }

  .bottom {
    grid-area: bottom;
    padding: 24px;
  }

  .claim {
    color: $white;
    font-family: $granissat-font;
    font-weight: 900;
    font-size: 24px;
    padding: 24px;
    line-height: 1;
  }

  .aspect-916 {
    &.layout-top {
      .grid {
        grid-template-rows: 1fr 1fr;
        grid-template-areas: "picture" "text";
      }
    }

    &.layout-bottom {
      .grid {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
        grid-template-areas: "text" "picture";
      }

      .text {
        padding-top: 72px;
      }
    }

    .bottom,
    .claim {
      display: none;
    }
  }
</style>

<style lang="scss">
  @import "../../../../sass/variables";

  .text-wysiwyg {
    h1 {
      font-size: 1.5em;
      font-weight: 900;
      margin-bottom: 6px;

      &:not(:first-child) {
        margin-top: 12px;
      }
    }

    strong {
      color: $white;
    }

    ul, ol {
      padding-left: 24px;
      margin-top: 6px;
      margin-bottom: 12px;
    }

    ul li {
      list-style: disc;
    }
  }
</style>
