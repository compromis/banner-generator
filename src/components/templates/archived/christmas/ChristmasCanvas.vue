<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      aspect === '11' ? 'disposition-' + banner.disposition : '',
      'color-' + banner.color
    ]"
    v-if="banner">
    <christmas-background class="christmas-background" :color="color" />
    <careta class="careta" />
    <img src="./santa-hat.png" class="santa-hat" />
    <div class="text" v-if="banner.language === 0">
      <span class="text-local">Des de Compromís<br />{{ banner.localLabel }} us desitgem</span>
      <span class="text-merry">Bones festes <br /> i bon any 2020!</span>
    </div>
    <div v-else class="text">
      <span class="text-local">Desde Compromís <br />{{ banner.localLabel }} os deseamos</span>
      <span class="text-merry">¡Felices fiestas <br /> y feliz año 2020!</span>
    </div>
    <div class="background"></div>
  </div>
</template>

<script>
import ChristmasBackground from './ChristmasBackground'
import Careta from '@/components/canvas/Careta'
import CanvasMixin from '@/mixins/canvas-mixin.js'

export default {
  name: 'generic-canvas',

  mixins: [CanvasMixin],

  components: {
    ChristmasBackground,
    Careta
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";
  @import "./colors";

  @font-face {
    font-family: 'Windsor';
    src: url('./Windsor.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
  }

  .christmas-background {
    position: relative;
    z-index: 1;
  }

  .santa-hat {
    position: absolute;
    top: 43px;
    left: 188px;
    width: 265px;
    z-index: 15;
  }

  .careta {
    position: absolute;
    width: 214px;
    height: 214px;
    top: 180px;
    left: 258px;
    z-index: 10;
    transform: rotate(-7deg);
  }

  .text {
    position: absolute;
    left: 115px;
    right: 115px;
    bottom: 130px;
    text-align: center;
    font-family: Windsor, serif;
    line-height: .9;
    letter-spacing: -.025rem;
    z-index: 20;

    &-local {
      font-size: 36px;
      margin-bottom: 5px;
      color: $green;
    }

    &-merry {
      font-size: 50px;
      color: $red;
    }

    span {
      display: block;
    }
  }

  .color {
    &-2 {
      .text {
        &-local {
          color: $red;
        }

        &-merry {
          color: $green;
        }
      }
    }

    &-3 {
      .text {
        &-local {
          color: $yellow;
        }

        &-merry {
          color: $white;
        }
      }
    }

    &-4 {
      .text {
        &-local {
          color: $yellow;
        }

        &-merry {
          color: $white;
        }
      }
    }
  }

  .aspect-916 {
    .background {
      background: $yellow;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
    }

    .careta {
      width: 177px;
      height: 177px;
      top: 120px;
      left: 110px;
    }

    .santa-hat {
      top: 7px;
      left: 51px;
      width: 220px;
    }

    .text {
      left: 30px;
      right: 30px;
      bottom: 90px;

      &-local {
        margin-bottom: 10px;
      }

      &-merry {
        font-size: 46px;
      }
    }

    &.color-3 {
      .background {
        background: $green;
      }
    }

    &.color-4 {
      .background {
        background: $red;
      }
    }
  }
</style>
