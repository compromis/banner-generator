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
    <div class="card-grid">
      <div class="card" v-for="(card, i) in banner.cards" :key="i" :class="['card-colspan-' + card.colspan, 'card-rowspan-' + card.rowspan]">
        {{i}}
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
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .card-grid {
    margin: 32px;
    height: 590px;
    gap: 12px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-auto-flow: dense;

    .card {
      z-index: 10;

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
  }

</style>
