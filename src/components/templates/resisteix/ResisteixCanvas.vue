<template>
  <div
    :id="'bannerCanvas' + aspect"
    class="banner-canvas"
    v-if="banner">
    <div :class="['background-image', {'has-picture': banner.picturePreview}]">
      <img :src="banner.picturePreview" alt="Imatge" v-if="banner.picturePreview" :style="objectPosition" />
    </div>
    <div class="content">
      <h1>Pla Resisteix</h1>
      <div class="card card--primary">
        <div class="numbers">
          <main>
            <h2>{{ banner.municipality }}</h2>
            <strong class="big-number">{{ banner.amount }} €</strong>
            <span contenteditable>{{ line('AJUDA') + banner.municipality }}</span>
          </main>
          <aside>
            <div>
              <strong>2.000 €</strong>
              <span>{{ line('PER_EMPRESA') }}</span>
            </div>
            <hr>
            <div>
              <strong>+200 €</strong>
              <span>{{ line('PER_TREBALLADOR') }}</span>
            </div>
          </aside>
        </div>
      </div>
      <div class="card card--secondary">
        <h2>{{ line('SECTORS') }}</h2>
        <ul class="sectors">
          <li>
            <div><img src="./icon-restaurant.svg" style="height: 60px"></div>
            <span>{{ line('RESTAURANT') }}</span>
          </li>
          <li>
            <div><img src="./icon-hotel.svg" style="height: 60px"></div>
            <span>{{ line('TURISME') }}</span>
          </li>
          <li>
            <div><img src="./icon-gym.svg" style="height: 40px"></div>
            <span>{{ line('ESPORTS') }}</span>
          </li>
          <li>
            <div><img src="./icon-boombox.svg" style="height: 60px"></div>
            <span>{{ line('CULTURA') }}</span>
          </li>
        </ul>
      </div>
    </div>
    <banner-frame
      theme="blobless"
      :aspect="aspect" />
  </div>
</template>

<script>
import BannerFrame from '@/components/canvas/BannerFrame'
import CanvasMixin from '@/mixins/canvas-mixin.js'

export default {
  name: 'resisteix-canvas',

  mixins: [CanvasMixin],

  components: {
    BannerFrame
  },

  data () {
    return {
      literals: {
        val: {
          AJUDA: 'Ajuda rebuda per a empreses i autònoms',
          PER_EMPRESA: 'per cada microempresa o autònom',
          PER_TREBALLADOR: 'per cada treballador/a',
          SECTORS: 'SECTORS BENEFICIATS',
          RESTAURANT: 'Hostaleria i oci nocturn',
          TURISME: 'Turisme i allotjaments',
          ESPORTS: 'Esports i entreteniment',
          CULTURA: 'Cultura i espectacles'
        },
        cas: {
          AJUDA: 'Ayuda recibida para empresas y autónomos de ',
          PER_EMPRESA: 'por cada microempresa o autónomo',
          PER_TREBALLADOR: 'por cada trabajador/a',
          SECTORS: 'SECTORES BENEFICIADOS',
          RESTAURANT: 'Hostelería y ocio nocturno',
          TURISME: 'Turismo y alojamiento',
          ESPORTS: 'Deporte y entretenimiento',
          CULTURA: 'Cultura y espectáculos'
        }
      }
    }
  },

  methods: {
    line (ref) {
      if (ref === 'AJUDA' && this.banner.lang === 'val') {
        return this.handleGenitive()
      }

      return this.literals[this.banner.lang][ref]
    },

    handleGenitive () {
      let string = this.literals.val.AJUDA
      if ([
        'a', 'e', 'i', 'o', 'u',
        'A', 'E', 'I', 'O', 'U',
        'à', 'è', 'ò', 'À', 'È', 'Ò',
        'í', 'ú', 'Ú', 'Í'
      ].includes(this.banner.municipality[0])) {
        string += " d'"
      } else {
        string += ' de '
      }

      return string
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .content {
    position: absolute;
    top: 58px;
    left: 70px;
    right: 70px;
    color: $gray-900;

    h1 {
      color: $white;
      font-size: 56px;
      letter-spacing: -.03em;
      margin-bottom: -6px;
    }

    h2 {
      color: $gray-600;
      text-transform: uppercase;
      letter-spacing: .03em;
      font-size: 16px;
    }
  }

  .card {
    --card-padding: 18px;
    background: $white;
    border-radius: 16px;
    box-shadow: $raised-shadow;
    padding: var(--card-padding);
    margin: 24px 0;
    overflow: hidden;
  }

  .numbers {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 16px;

    strong {
      display: block;
      font-size: 37px;
      letter-spacing: -0.03em;
      line-height: 1.2;
      font-weight: 500;
    }

    span {
      display: block;
      color: $gray-600;
      line-height: 1.1;
      font-size: 16px;
    }

    main {
      display: flex;
      flex-direction: column;

      .big-number {
        font-size: 74px;
        margin-top: auto;
      }

      span {
        font-size: 19px;
      }
    }

    aside {
      background: $gray-100;
      margin: calc(var(--card-padding) * -1);
      margin-left: 0;
      padding: 32px var(--card-padding);

      hr {
        margin: 16px 0;
        background-color: $gray-300;
        height: 1px;
      }
    }
  }

  .sectors {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin: 0;
    gap: 16px;
    list-style: none;

    li {
      margin: 0;
      padding: 0;
    }

    div {
      display: flex;
      height: 92px;
      align-items: center;
      justify-content: center;
    }

    span {
      display: block;
      text-align: center;
      line-height: 1.1;
      color: $gray-600;
    }
  }

  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: $gradient;
    }

    &.has-picture::after {
      background: linear-gradient(330deg, rgba($gradient-start, .95), rgba($gradient-end, .7), rgba($gradient-end, .95))
    }
  }
</style>
