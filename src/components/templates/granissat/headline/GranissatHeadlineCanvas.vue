<template>
  <div
    v-if="banner"
    :id="'bannerCanvas' + aspect"
    :class="['banner-canvas', 'aspect-' + aspect, { 'has-picture': !!mainPicture }]">
    <div class="grid">
      <div class="headline">
        <div class="headline-text" :style="{ fontSize: headlineFontSize }">{{ banner.headline | formatString }}</div>
        <div class="headline-source headline-source--custom" v-if="banner.source === 'other'">
          {{ banner.customSource }}
        </div>
        <div class="headline-source" v-else-if="banner.source">
          <img
            :src="'logoCard' in banner.source ? banner.source.logoCard : banner.source.logo"
            :alt="banner.source.name"
            :style="{ height: banner.source.logoHeight + 'px' }" />
        </div>
      </div>
      <div class="claim claim--custom" v-if="banner.hasOwnTagline">{{ banner.tagline }}</div>
      <div class="claim" v-else>
        Som molt<br />de tu.<br />Som molt<br />d'ací.
      </div>
      <div class="bottom">
        <multi-logo v-if="aspect !== '916'" />
      </div>
    </div>
    <div v-if="mainPicture" class="picture" :style="{ backgroundImage: `url(${mainPicture})`, ...backgroundPosition, '--frame-crop': `${banner.pictureFrameCrop}px` }" />
    <div :class="['background', 'bg-' + banner.bgColor]" />
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'
import MultiLogo from '@/components/canvas/MultiLogo'

export default {
  components: {
    MultiLogo
  },

  mixins: [CanvasMixin],

  computed: {
    headlineFontSize () {
      const sizes = {
        11: { min: 50, max: 80 },
        45: { min: 40, max: 65 },
        916: { min: 30, max: 50 },
        169: { min: 30, max: 50 }
      }

      return this.fontSize(this.banner.headline, sizes[this.aspect].max, sizes[this.aspect].min, 160)
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
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr auto;
    grid-template-areas: "headline headline" "claim bottom";
    z-index: 20;
    padding: 24px;
    gap: 24px;
    color: $white;
  }

  .has-picture {
    .grid {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr auto;
      grid-template-areas: "bottom" "headline" "claim";
    }

    .bottom {
      align-self: start;
      justify-self: start;
    }
  }

  .picture {
    position: absolute;
    z-index: 10;
    bottom: 0;
    right: 0;
    width: 70%;
    height: calc(420px - var(--frame-crop));
  }

  .headline {
    grid-area: headline;

    &-text {
      font-weight: 900;
      font-family: $granissat-font;
      line-height: 1;
      padding-right: 40px;
      word-wrap: break-word;
      white-space: pre-wrap;
    }
  }

  .claim {
    grid-area: claim;
    color: $white;
    font-family: $granissat-font;
    font-weight: 900;
    font-size: 24px;
    line-height: 1;

    &--custom {
      word-wrap: break-word;
      white-space: pre-wrap;
    }
  }

  .bottom {
    grid-area: bottom;
    align-self: end;
    justify-self: end;
  }

  .headline-source {
    margin-top: 26px;
    width: 30%;
    line-height: 1.1;
    padding-right: 8px;

    &--custom {
      font-weight: 900;
      font-size: 20px;
    }

    img {
      filter: grayscale(100%) brightness(0) invert(1);
      height: 32px;
      max-width: 100%;
      object-fit: contain;
      object-position: top left;
    }
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }

  .aspect-916 {
    .picture {
      width: auto;
      height: calc(50% - var(--frame-crop));
      left: 0;
    }

    .claim,
    .bottom {
      display: none;
    }

    .headline {
      padding-top: 30px;

      &-text {
        padding-right: 0;
      }

      &-source {
        width: auto;
      }
    }
  }

  .aspect-169 {
    .grid,
    .has-picutre .grid {
      grid-template-areas:
        "headline"
        "bottom";
      grid-template-columns: 1fr;
      grid-template-rows: 1fr auto;
    }

    .headline {
      width: 80%;
    }

    &.has-picture .headline {
      width: 60%;
    }

    .picture {
      width: 50%;
      top: 0;
      bottom: 0;
      height: auto;
    }

    .claim {
      display: none;
    }

    .bottom {
      justify-self: start;
    }
  }
</style>
