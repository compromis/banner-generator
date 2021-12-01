<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      'lang-' + banner.lang
    ]"
    v-if="banner">
    <div class="background">
      <div class="background-picture" v-if="banner.picture && banner.hasCustomPicture" key="picture">
        <img v-if="banner.picture" :src="banner.picturePreview" :style="objectPosition" />
      </div>
      <div class="frame"></div>
      <img class="snow-overlay" src="./snow-overlay.svg" alt="">
      <div class="picture">
        <div class="title">
          <christmas-local-greeting :lang="banner.lang"/>
        </div>
      </div>
      <div class="text">
        <div v-if="banner.hasCustomMessage && banner.customMessage" class="text-default">{{ banner.customMessage }}</div>
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
import CompromisLogo from '@/components/utils/CompromisLogo'
import ChristmasLocalGreeting from './ChristmasLocalGreeting'
import CanvasMixin from '@/mixins/canvas-mixin'

export default {
  name: 'christmas-greetings-canvas',

  mixins: [CanvasMixin],

  components: {
    CompromisLogo,
    ChristmasLocalGreeting
  },

  computed: {
    textDefault () {
      const { lang } = this.banner
      const texts = {
        val: `T’estime tant que enguany em quede a casa.`,
        cas: `Te quiero tanto que este año me quedo en casa.`
      }

      return texts[lang]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .background {
    --dark-christmas: #2b2b2b;
    --orange-christmas:  #f96500;

    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-color: var(--dark-christmas);
  }

  .frame {
    border: 1px solid var(--orange-christmas);
    height: 94%;
    width: 94%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 10;
  }

  .snow-overlay {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
    opacity: 0.7;
  }

  .picture {
    position: absolute;
    top: 169px;
    left: 60px;
    right: 60px;
  }

  .background-picture {
    position: relative;
    z-index: 1;
    height: 100%;
    background: var(--dark-christmas);
    z-index: -2;

    img {
      width: 100%;
      height: 100%;
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
      background: var(--dark-christmas);
      opacity: .65;
    }
  }

  .smiley-santa {
    z-index: 200;

    .santa-hat {
      position: absolute;
      top: 103px;
      left: 143px;
      width: 238px;
    }

    .careta {
      position: absolute;
      top: 220px;
      width: 205px;
      left: 201px;
    }
  }

  .title {
    position: absolute;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 70px;
    color: var(--orange-christmas);
    z-index: 20;
  }

  .text {
    position: absolute;
    bottom: 28px;
    left: 40px;
    right: 40px;
    text-align: center;
    font-size: 20px;
    line-height: 1.1;
    color: var(--orange-christmas);
    letter-spacing: -.025em;
    z-index: 100;

    .compromis-logo {
      display: flex;
      width: fit-content;
      margin: 0 auto;
      padding: 18px 0;
      align-items: center;

      svg {
        width: 160px;
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
</style>
