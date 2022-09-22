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
    <div :class="['card-grid', { 'card-grid-with-title': banner.title.length > 0, 'card-grid-single-row': rowCount === 1}]">
      <div class="banner-title" v-if="banner.title">
        {{ banner.title }}
      </div>
      <div class="card"
        v-for="card in computedCards"
        :key="card.id"
        :class="[
          'card-type-' + card.type,
          'card-colspan-' + card.colspan,
          'card-rowspan-' + card.rowspan,
          {'card-chunky' : isChunky(card)}
        ]">
        <div v-if="card.type === 'emoji'" v-html="card.emoji" class="card-emoji" />
        <div v-if="card.type === 'number'" class="card-number">
          <svg width="100%" height="75">
            <linearGradient id="compromis">
              <stop  offset="0" style="stop-color:#F29127"/>
              <stop  offset="0.2054" style="stop-color:#EC8426"/>
              <stop  offset="0.6036" style="stop-color:#DE6626"/>
              <stop  offset="1" style="stop-color:#D13D27"/>
            </linearGradient>
            <text x="0" :y="isChunky(card) ? 55 : 35" style="fill: url(#compromis)">{{ card.number }}</text>
          </svg>
        </div>
        <div v-if="card.type === 'text'" contenteditable class="card-text-header" spellcheck="false">
          {{ card.textHeader }}
        </div>
        <p class="card-text" contenteditable spellcheck="false">{{ card.text }}</p>
      </div>
    </div>
    <emojis-on-canvas v-model="banner.emojis" />
    <banner-frame />
    <banner-picture :picture-position="backgroundPosition" />
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
    },

    cellCount () {
      return this.computedCards.reduce((sum, { colspan, rowspan }) => sum + colspan * rowspan, 0)
    },

    rowCount () {
      return Math.ceil(this.cellCount / 3)
    }
  },

  methods: {
    isChunky (card) {
      return (card.rowspan * card.colspan >= 4) || (this.rowCount === 2 && card.colspan >= 2)
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

    &-single-row {
      top: 180px;
      bottom: 200px;
    }

    &-single-row.card-grid-with-title {
      top: 150px;
      bottom: 170px;
    }

    .card {
      padding: 20px;
      display: flex;
      flex-direction: column;
      color: $gray-900;

      &-text {
        margin-top: auto;
        padding-top: 10px;
        font-size: 22px;
        line-height: 1.25;
        letter-spacing: -0.02em;
        color: $gray-700;
      }

      &-type-emoji .card-text {
        color: $gray-900;
      }

      &-emoji::v-deep img {
        width: 45px;
      }

      &-text-header {
        font-size: 36px;
        letter-spacing: -0.02em;
        line-height: 1.1;
      }

      &-number {
        font-size: 46px;
        letter-spacing: -0.03em;
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

      &-chunky {
        .card-text-header, {
          font-size: 48px;
        }

        .card-number {
          font-size: 64px;
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
