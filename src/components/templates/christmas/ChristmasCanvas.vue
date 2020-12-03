<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
    ]"
    v-if="banner">
    <div class="background" :style="{ '--light-vibrant': lightVibrant, '--dark-vibrant': darkVibrant, '--dark-muted': darkMuted, '--vibrant': vibrant }">
      <div class="picture">
        <div class="title">
          <span class="top">A Nadal,</span>
          <span class="bottom">comerç local</span>
        </div>
        <div class="picture-holder">
          <img v-if="banner.picture" :src="banner.picturePreview" :style="objectPosition" />
        </div>
        <div class="decorations">
          <christmas-decoration v-for="i in 3" :key="i" :class="`decoration-${i}`" />
        </div>
      </div>
      <div class="text">
        <div v-if="banner.hasCustomMessage" class="text-default">{{ banner.customMessage }}</div>
        <div v-else class="text-default">{{ textDefault }}</div>
        <div class="compromis-logo">
          <compromis-logo mono />
          <span :class="['municipality', {'municipality--long': banner.municipality.length > 18 }]">{{ banner.municipality }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vibrant from 'node-vibrant'
import CompromisLogo from '@/components/utils/CompromisLogo'
import CanvasMixin from '@/mixins/canvas-mixin'
import ChristmasDecoration from './ChristmasDecoration'

export default {
  name: 'christmas-canvas',

  mixins: [CanvasMixin],

  components: {
    CompromisLogo,
    ChristmasDecoration
  },

  data () {
    return {
      palette: null
    }
  },

  computed: {
    lightVibrant () {
      const [r, g, b] = this.palette ? this.palette['LightVibrant'].rgb : [232, 205, 175]
      return `rgb(${r}, ${g}, ${b})`
    },

    darkVibrant () {
      const [r, g, b] = this.palette ? this.palette['DarkVibrant'].rgb : [4, 40, 95]
      return `rgb(${r}, ${g}, ${b})`
    },

    darkMuted () {
      const [r, g, b] = this.palette ? this.palette['DarkMuted'].rgb : [84, 59, 47]
      return `rgb(${r}, ${g}, ${b})`
    },

    vibrant () {
      if (!this.palette) return 'rgb(196, 132, 68)'
      const [r, g, b] = this.palette ? this.palette['Vibrant'].rgb : [184, 118, 48]
      return `rgb(${r}, ${g}, ${b})`
    },

    municipalityWithPreposition () {
      const { municipality } = this.banner
      let string = ''

      if (['a', 'à', 'e', 'è', 'é', 'i', 'í', 'o', 'ò', 'ó', 'u', 'ú', 'A', 'À', 'E', 'È', 'É', 'I', 'Í', 'O', 'Ò', 'Ó', 'U', 'Ú'].includes(municipality[0])) {
        string += "d'"
      } else {
        string += 'de '
      }

      string += municipality

      return string
    },

    textDefault () {
      const { municipality, lang } = this.banner
      const texts = {
        val: `Aquest any especialment, els xicotets comerços ${this.municipalityWithPreposition} et necessiten!`,
        cas: `Este año especialmente, los pequeños comercios de ${municipality} te necesitan!`
      }

      return texts[lang]
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
      img.setAttribute('src', this.banner.picturePreview)

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
  @import "../../../sass/variables";

  @font-face {
    font-family: 'Texturina';
    font-style: normal;
    font-weight: 900;
    font-display: swap;
    src: url(./Texturina.ttf) format('truetype');
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
    top: 236px;
    left: 60px;
    right: 60px;

    &-holder {
      position: relative;
      z-index: 1;
      transform: rotate(-2deg);
      height: 306px;
      background: var(--dark-muted);

      img {
        width: 100%;
        height: 306px;
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

  .title {
    position: absolute;
    top: -195px;
    left: 0;
    font-size: 95px;
    font-family: Texturina, serif;
    font-weight: 900;
    line-height: .8;
    color: var(--dark-vibrant);
    z-index: 20;

    .top {
      display: block;
      font-size: .95em;
    }

    .bottom {
      display: block;
      text-indent: .6em;
    }
  }

  .decorations {
    color: var(--vibrant);

    [class^='decoration'] {
      position: absolute;
      height: var(--size);
      width: var(--size);
      z-index: 20;
    }

    .decoration-1 {
      --size: 113px;
      top: 45px;
      left: -40px;
    }

    .decoration-2 {
      --size: 70px;
      top: 172px;
      left: -43px;
    }

    .decoration-3 {
      --size: 100px;
      bottom: -24px;
      right: -41px;
    }

    svg {
      display: block;
    }
  }

  .text {
    position: absolute;
    bottom: 0;
    left: 78px;
    right: 78px;
    text-align: center;
    font-weight: bold;
    font-size: 22px;
    line-height: 1.1;
    color: var(--dark-vibrant);
    letter-spacing: -.025em;

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
      font-size: 50px;
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

    .decoration-1 {
      --size: 90px;
    }

    .decoration-2 {
      --size: 50px;
      top: 151px;
      left: -30px;
    }

    .decoration-3 {
      --size: 75px;
      right: -35px;
    }

    .text {
      font-size: 17px;
      bottom: 50px;
      left: 55px;
      right: 55px;

      .compromis-logo {
        width: 140px;
        padding: 20px 0;
      }
    }

    .municipality {
      display: none;
    }
  }
</style>
