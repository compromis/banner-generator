<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
    ]"
    v-if="banner">
    <div class="background" :style="{ backgroundColor: lightVibrant }">
      <div class="picture" :style="{ '--color': vibrant }">
        <div class="title" :style="{ color: darkVibrant }"><span>A Nadal,</span><br>comerç local</div>
        <img v-if="banner.picture" :src="banner.picturePreview" :style="picturePosition" />
      </div>
      <div class="text" :style="{ color: darkVibrant }">
        Aquest any especialment, els xicotets<br>comerços de {{ banner.municipality }} et necessiten!
        <div class="compromis-logo">
          <compromis-logo mono />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CompromisLogo from '@/components/utils/CompromisLogo'
import CanvasMixin from '@/mixins/canvas-mixin'
var Vibrant = require('node-vibrant')

export default {
  name: 'christmas-canvas',

  mixins: [CanvasMixin],

  components: {
    CompromisLogo
  },

  data () {
    return {
      palette: null
    }
  },

  computed: {
    lightVibrant () {
      if (!this.palette) return '#eee'
      const [r, g, b] = this.palette['LightVibrant'].rgb

      return `rgb(${r}, ${g}, ${b})`
    },

    darkVibrant () {
      if (!this.palette) return '#333'
      const [r, g, b] = this.palette['DarkVibrant'].rgb

      return `rgb(${r}, ${g}, ${b})`
    },

    darkMuted () {
      if (!this.palette) return '#333'
      const [r, g, b] = this.palette['DarkMuted'].rgb

      return `rgb(${r}, ${g}, ${b})`
    },

    vibrant () {
      if (!this.palette) return '#333'
      const [r, g, b] = this.palette['Vibrant'].rgb

      return `rgb(${r}, ${g}, ${b})`
    },

    muted () {
      if (!this.palette) return '#333'
      const [r, g, b] = this.palette['Muted'].rgb

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
  @import url('https://fonts.googleapis.com/css2?family=Texturina:wght@600;662&display=swap');

  .background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
  }

  .picture {
    position: absolute;
    top: 200px;
    left: 40px;
    right: 40px;

    img {
      width: 100%;
      height: 350px;
      object-fit: cover;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background: var(--color);
      mix-blend-mode: lighten;
      opacity: .85;
    }
  }

  .title {
    position: absolute;
    top: -143px;
    left: 20px;
    font-size: 95px;
    font-family: Texturina, serif;
    font-weight: 600;
    line-height: .8;

    span {
      font-size: 75px;
      font-weight: 800;
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

    .compromis-logo {
      width: 180px;
      margin: 0 auto;
      padding: 30px 0;
    }
  }
</style>
