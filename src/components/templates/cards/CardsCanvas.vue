<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      'theme-' + banner.theme,
      'banner-background-' + banner.mode,
      'logo-' + banner.logo
    ]"
    v-if="banner">
    <div :class="['card-grid', { 'card-grid-with-title': banner.title.length > 0 }]">
      <div class="banner-title" v-if="banner.title">
        {{ banner.title }}
      </div>
      <div class="card"
        v-for="card in computedCards"
        :key="card.id"
        :class="['card-colspan-' + card.colspan, 'card-rowspan-' + card.rowspan]">
        <div v-if="card.type === 'emoji'" v-html="card.emoji" class="card-emoji" />
        <div v-else class="card-number">
          {{ card.number }}
        </div>
        <p class="card-text">{{ card.text }}</p>
      </div>
    </div>
    <emojis-on-canvas v-model="banner.emojis" />
    <banner-frame />
    <banner-picture :picture-position="objectPosition" />
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin'
import BannerPicture from '@/components/canvas/BannerPicture'
import BannerFrame from '@/components/canvas/BannerFrame'
import EmojisOnCanvas from '@/components/canvas/EmojisOnCanvas'

export default {
  name: 'cards-canvas',

  mixins: [CanvasMixin],

  components: {
    EmojisOnCanvas,
    BannerPicture,
    BannerFrame
  },

  computed: {
    computedCards () {
      let max = 9
      let count = 0
      const { cards } = this.banner
      const computedCards = []

      for (const card of cards) {
        count = count + card.colspan * card.rowspan
        if (max >= count) {
          computedCards.push(card)
        }
      }

      return computedCards
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .card-grid {
    position: absolute;
    top: 38px;
    right: 38px;
    left: 38px;
    bottom: 96px;
    gap: 24px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 1fr;
    grid-auto-flow: dense;
    z-index: 30;

    &-with-title {
      grid-template-rows: auto 1fr;
    }

    .card {
      padding: 20px;
      display: flex;
      flex-direction: column;
      color: $gray-900;

      &-text {
        margin-top: auto;
        padding-top: 10px;
        font-size: 20px;
        line-height: 1.25;
        letter-spacing: -0.02em;
        color: $gray-700;
      }

      &-emoji::v-deep img {
        width: 45px;
      }

      &-number {
        font-size: 36px;
        letter-spacing: -0.02em;
        line-height: 1.1;
      }

      &-colspan {
        &-2 {
          grid-column: span 2;
        }

        &-3 {
          grid-column: span 3;
        }
      }

      &-rowspan {
        &-2 {
          grid-row: span 2;
        }

        &-3 {
          grid-row: span 3;
        }
      }
    }

    .banner-title {
      position: relative;
      z-index: 40;
      color: $white;
      grid-column: span 3;
      font-size: 42px;
      font-weight: bold;
      line-height: 1.1;
      letter-spacing: -0.02em;
    }
  }

</style>
