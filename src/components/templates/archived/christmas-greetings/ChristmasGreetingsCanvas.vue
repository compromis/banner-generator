<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      'lang-' + banner.lang
    ]"
    v-if="banner">
    <div class="background" :style="{ '--light-vibrant': lightVibrant, '--dark-vibrant': darkVibrant, '--dark-muted': darkMuted, '--vibrant': vibrant }">
      <div class="picture">
        <div class="title">
          <span class="top">{{ banner.text }}</span>
        </div>
        <div class="picture-holder" v-if="banner.pictureBlob || banner.picturePreview" key="picture">
          <img v-if="banner.picture" :src="banner.pictureBlob || banner.picturePreview" :style="objectPosition" />
        </div>
        <div v-else class="smiley-santa" key="santa">
          <careta class="careta" />
          <img src="./santa-hat.png" class="santa-hat" />
        </div>
      </div>
      <div class="text">
        <div v-if="banner.customMessage" class="text-default">{{ banner.customMessage }}</div>
        <div class="compromis-logo">
          <compromis-logo mono />
          <span :class="['municipality', {'municipality--long': banner.municipality.length > 18 }]">{{ banner.municipality }}</span>
        </div>
      </div>
      <div class="decorations">
        <christmas-greetings-decoration />
        <christmas-greetings-decoration class="clone" />
      </div>
    </div>
  </div>
</template>

<script>
import Vibrant from 'node-vibrant'
import CompromisLogo from '@/components/utils/CompromisLogo'
import Careta from '@/components/canvas/Careta'
import CanvasMixin from '@/mixins/canvas-mixin'
import ChristmasGreetingsDecoration from './ChristmasGreetingsDecoration'

export default {
  name: 'christmas-greetings-canvas',

  mixins: [CanvasMixin],

  components: {
    CompromisLogo,
    Careta,
    ChristmasGreetingsDecoration
  },

  data () {
    return {
      palette: null
    }
  },

  computed: {
    lightVibrant () {
      const [r, g, b] = this.palette && this.banner.colorsFromPicture && this.banner.picture ? this.palette['LightVibrant'].rgb : [246, 178, 37]
      return `rgb(${r}, ${g}, ${b})`
    },

    darkVibrant () {
      const [r, g, b] = this.palette && this.banner.colorsFromPicture && this.banner.picture ? this.palette['DarkVibrant'].rgb : [255, 255, 255]
      return `rgb(${r}, ${g}, ${b})`
    },

    darkMuted () {
      const [r, g, b] = this.palette && this.banner.colorsFromPicture && this.banner.picture ? this.palette['DarkMuted'].rgb : [84, 59, 47]
      return `rgb(${r}, ${g}, ${b})`
    },

    vibrant () {
      const [r, g, b] = this.palette && this.banner.colorsFromPicture && this.banner.picture ? this.palette['Vibrant'].rgb : [220, 86, 38]
      return `rgb(${r}, ${g}, ${b})`
    }
  },

  mounted () {
    this.getPalette()
  },

  watch: {
    'banner.picturePreview' () {
      this.getPalette()
    }
  },

  methods: {
    getPalette () {
      const img = document.createElement('img')
      img.setAttribute('src', this.banner.pictureBlob)
      img.addEventListener('load', () => {
        Vibrant.from(img).maxColorCount(200).getPalette().then((palette) => {
          this.palette = palette
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../../sass/variables";

  @font-face {
    font-family: 'Mochi';
    font-style: normal;
    font-weight: 900;
    src: url(./mochi-bold-webfont.woff2) format('truetype');
  }

  .background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-color: var(--light-vibrant);
  }

  .picture {
    position: absolute;
    top: 169px;
    left: 60px;
    right: 60px;

    &-holder {
      position: relative;
      z-index: 1;
      transform: rotate(-2deg);
      height: 400px;
      background: var(--dark-muted);

      img {
        width: 100%;
        height: 400px;
        object-fit: cover;
        display: block;
      }

      &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: var(--dark-muted);
        mix-blend-mode: lighten;
        opacity: .85;
      }
    }
  }

  .smiley-santa {
    position: relative;
    z-index: 200;

    .santa-hat {
      position: absolute;
      top: -25px;
      left: 106px;
      width: 329px;
    }

    .careta {
      position: absolute;
      top: 144px;
      width: 289px;
      left: 184px;
      transform: rotate(-4deg);
    }
  }

  .title {
    position: absolute;
    top: -136px;
    left: -30px;
    right: -30px;
    font-size: 100px;
    font-family: Mochi, serif;
    font-weight: 900;
    line-height: .9;
    text-align: center;
    color: var(--dark-vibrant);
    z-index: 20;
  }

  .lang-cas .title {
    font-size: 91px;
    top: -125px;
  }

  .decorations {
    position: absolute;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: var(--vibrant);
    z-index: 1;
    overflow: hidden;

    svg {
      width: 105%;
      height: 105%;
      margin: -20px;
    }

    .clone {
      display: none;
    }
  }

  .text {
    position: absolute;
    bottom: 0;
    left: 40px;
    right: 40px;
    text-align: center;
    font-weight: bold;
    font-size: 22px;
    line-height: 1.1;
    color: var(--dark-vibrant);
    letter-spacing: -.025em;
    z-index: 100;

    .compromis-logo {
      display: flex;
      width: fit-content;
      margin: 0 auto;
      padding: 30px 0;
      align-items: center;

      svg {
        width: 180px;
      }

      .municipality {
        font-weight: normal;
        margin-left: 10px;

        &--long {
          font-size: 14px;
          white-space: normal;
          width: 90px;
          text-align: left;
        }
      }
    }
  }

  /* Story */
  .aspect-916 {
    .title {
      top: -112px;
      left: -3px;
      font-size: 56px;
    }

    &.lang-cas .title {
      font-size: 49px;
    }

    .picture {
      top: 168px;
      left: 40px;
      right: 40px;

      &-holder {
        height: 360px;

        img {
          height: 360px;
        }
      }
    }

    .text {
      font-size: 17px;
      bottom: 44px;
      left: 65px;
      right: 65px;

      .compromis-logo {
        width: 140px;
        padding: 20px 0;
      }
    }

    .municipality {
      display: none;
    }

    .smiley-santa {
      .santa-hat {
        top: -34px;
        left: -32px;
        width: 309px;
      }

      .careta {
        top: 121px;
        width: 262px;
        left: 45px;
      }
    }

    .decorations {
      svg {
        width: auto;
        margin-left: -20%;
      }

      .clone {
        position: absolute;
        top: 0;
        display: block;
        margin-left: -70%;

        &::v-deep g:last-child {
          display: none;
        }
      }
    }
  }
</style>
