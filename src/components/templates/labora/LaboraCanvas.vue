<template>
  <div
    :id="'bannerCanvas' + aspect"
    class="banner-canvas"
    v-if="banner">
    <div :class="['background-image', {'has-picture': banner.picturePreview}]">
      <img :src="banner.picturePreview" alt="Imatge" v-if="banner.picturePreview" :style="objectPosition" />
    </div>
    <div class="content">
      <div class="sup">{{ banner.municipality }}</div>
      <div class="line-1" v-html="line1"></div>
      <div class="big-number">{{ banner.amount }} €</div>
      <div class="line-2">{{ line2 }}</div>
      <div class="big-number big-number-people" style="margin-bottom: 0">
        <span class="big-number-people-icon"><font-awesome-icon :icon="['far', 'user-friends']" /></span>
        <span class="big-number-people-number">{{ banner.people }} {{ line3 }}</span>
      </div>
    </div>
    <banner-frame
      theme="blobless"
      hashtag="Amb Labora, les persones primer"
      :aspect="aspect" />
  </div>
</template>

<script>
import BannerFrame from '@/components/canvas/BannerFrame'
import CanvasMixin from '@/mixins/canvas-mixin.js'

export default {
  name: 'labora-canvas',

  mixins: [CanvasMixin],

  components: {
    BannerFrame
  },

  computed: {
    line1 () {
      return this.banner.lang === 'val'
        ? `Gràcies al <span>Programa ECOVID de Labora</span>, l'Ajuntament rebrà una ajuda de`
        : `Gracias al <span>Programa ECOVID de Labora</span>, el Ayuntamiento recibirá una ayuda de`
    },

    line2 () {
      return this.banner.lang === 'val'
        ? 'i podrà donar feina durant sis mesos a'
        : 'y podrá dar trabajo durante seis meses a'
    },

    line3 () {
      return this.banner.lang === 'val'
        ? 'persones'
        : 'personas'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

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
      background: $trans-gradient;
    }
  }

  .content {
    position: absolute;
    top: 120px;
    left: 70px;
    right: 70px;
    color: $gray-900;
    font-size: 28px;
    letter-spacing: -0.02em;
    line-height: 1.2;
    max-height: 570px;
    overflow: hidden;
    background: $white;
    border-radius: 16px;
    box-shadow: $raised-shadow;
    padding: 24px;

    .sup {
      text-transform: uppercase;
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 0.05em;
      margin-bottom: 16px;
      color: $gray-700;
    }

    .big-number {
      display: block;
      font-size: 62px;
      background: $gray-100;
      color: $gray-900;
      padding: 18px 24px;
      line-height: 1;
      margin: 10px -24px;
      letter-spacing: -0.04em;
      font-weight: bold;

      &-people {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto auto;
        margin-bottom: -24px !important;

        &-icon {
          margin-right: 10px;
        }
      }
    }

    .line-1::v-deep span {
      color: #e15d20;
      font-weight: bold;
    }

    .line-2 {
      margin-top: 34px;
    }
  }
</style>
