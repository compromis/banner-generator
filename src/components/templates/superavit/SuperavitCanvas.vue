<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      banner.localLabel && banner.hasLocalLabel ? 'has-local-label' : '',
    ]"
    v-if="banner">
    <div class="background-image">
      <img :src="banner.picturePreview" alt="Imatge" v-if="banner.picturePreview" :style="objectPosition" />
    </div>
    <div class="content">
      <div class="line-1" v-if="banner.lang === 'val'">{{ municipalityCouncil }} té estalviats</div>
      <div class="line-1" v-if="banner.lang === 'cas'">{{ municipalityCouncil }} tiene ahorrados</div>
      <div class="big-number">{{ banner.amount }} €</div>
      <div class="line-2" v-if="banner.lang === 'val'">Ho podriem invertir en</div>
      <div class="line-2" v-if="banner.lang === 'cas'">Lo podríamos invertir en</div>
      <ul class="list-of-things">
        <li v-for="(thing, i) in banner.things" :key="i">
          <img src="https://twemoji.maxcdn.com/2/svg/1f449.svg" />
          {{ thing.name ? thing.name : '(Inversió)' }}
        </li>
      </ul>
      <div class="line-3" v-if="banner.lang === 'val'">
        Però no ens deixa<br>el govern de <em>Pedro Sánchez</em>
        <img src="https://twemoji.maxcdn.com/2/svg/1f940.svg">
      </div>
      <div class="line-3" v-if="banner.lang === 'cas'">
        Pero no nos deja<br>el gobierno de <em>Pedro Sánchez</em>
        <img src="https://twemoji.maxcdn.com/2/svg/1f940.svg">
      </div>
    </div>
    <div class="logo">
      <compromis-logo :mono="true" />
      <div :class="{ 'logo-local-label': true, 'logo-local-label--long': banner.localLabel.length > 18 }" v-if="banner.localLabel && banner.hasLocalLabel">
        {{ banner.localLabel | formatLocal }}
      </div>
    </div>
    <div class="hashtag" v-if="aspect === '11'">
      {{ banner.hashtag }}
    </div>
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'

export default {
  name: 'superavit-canvas',

  mixins: [CanvasMixin],

  computed: {
    municipalityCouncil () {
      const { lang, municipality } = this.banner

      if (lang === 'val') {
        let string = "L'Ajuntament"

        if (['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'].includes(municipality[0])) {
          string += " d'"
        } else {
          string += ' de '
        }

        string += municipality

        return string
      }

      return `El Ayuntamiento de ${municipality}`
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
    background-color: $gray-900;

    img {
      width: 100%;
      height: 100%;
      opacity: .25;
      object-fit: cover;
    }
  }

  .content {
    position: absolute;
    top: 55px;
    left: 55px;
    right: 55px;
    color: $white;
    font-size: 32px;
    font-weight: bold;
    letter-spacing: -0.02em;
    line-height: 1.2;
    max-height: 570px;
    overflow: hidden;

    .big-number {
      display: inline-block;
      font-size: 92px;
      background: linear-gradient(to right, $gradient-start, $gradient-end);
      color: $white;
      border-radius: 10px;
      padding: 5px 20px;
      line-height: 1;
      margin-bottom: 30px;
      margin-top: 10px;
      letter-spacing: -0.04em;
    }

    .line-3 {
      em {
        font-style: normal;
        color: #f74249;
        background: rgba($gray-900, 1);
        padding: 0 8px;
        border-radius: 4px;
      }

      img {
        width: 38px;
        vertical-align: middle;
      }
    }

    .list-of-things {
      list-style: none;
      padding: 0;
      margin: 10px 0 40px 0;

      li {
        position: relative;
        font-weight: normal;
        padding-left: 48px;
        margin: 20px 0;

        img {
          position: absolute;
          left: 0;
          top: 2px;
          width: 34px;
        }
      }
    }
  }

  .logo {
    color: $white;
    z-index: 20;

    &-local-label {
      color: $white;
    }
  }

  .hashtag {
    bottom: 30px;
    left: 35px;
    top: auto;
    color: $white;
  }
</style>
