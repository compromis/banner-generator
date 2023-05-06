<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="['banner-canvas', 'aspect-' + aspect]"
    v-if="banner">
    <div class="proposal">
      <div class="picture" :style="{ backgroundImage: `url(${bannerPicture})`, ...backgroundPosition }" />
      <div :class="['text', 'bg-txt-' + banner.bgColor]">
        <h1 :style="{ fontSize: fontSizePrimary }">{{ $options.filters.formatString(banner.text) }}</h1>
        <span class="num" v-if="banner.num">{{ banner.num }}</span>
      </div>
      <div class="claim">
        <span v-if="banner.lang === 'val'">
          Per tot el<br />
          que importa
        </span>
        <span v-else>
          Per todo lo<br />
          que importa
        </span>
      </div>
      <multi-logo class="logo" />
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
        11: { min: 45, max: 90 },
        45: { min: 35, max: 80 },
        916: { min: 20, max: 50 },
        169: { min: 25, max: 60 }
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

  .proposal {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: $granissat-red;
    color: $white;
    --padding: 34px;
  }

  .picture {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 400px;
  }

  .claim {
    position: absolute;
    bottom: 100px;
    left: var(--padding);
    font-weight: 900;
    font-family: $granissat-font;
    font-size: 58px;
    line-height: .9;
    letter-spacing: -.03em;
  }

  .text {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 170px;
    left: 165px;
    right: var(--padding);
    top: calc(var(--padding) * 3);
    transition: .25s ease;
    padding: 24px;
    font-family: $granissat-font;
    font-weight: 900;
    letter-spacing: -.03em;
    line-height: 1;
    gap: 16px;

    .num {
      margin-top: auto;
      text-align: right;
      font-size: 26px;
    }
  }

  .logo {
    position: absolute;
    bottom: var(--padding);
    left: var(--padding);
  }

  .aspect-916 {
    .proposal {
      --padding: 18px;
    }

    .claim {
      bottom: 138px;
      font-size: 45px;
    }

    .logo {
      bottom: 78px;
    }

    .text {
      top: 150px;
      bottom: 192px;
      left: 90px;

      .num {
        font-size: 22px;
      }
    }
  }

  .aspect-169 {
    .proposal {
      --padding: 20px;
    }

    .logo {
      left: auto;
      right: var(--padding);
    }

    .claim {
      bottom: var(--padding);
    }

    .text {
      bottom: 95px;
    }

    .picture {
      height: 220px;
    }
  }
</style>
