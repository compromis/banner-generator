<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      'banner-background-' + banner.mode,
      'logo-' + banner.logo
    ]"
    v-if="banner">
    <div class="banner-content">
      <div class="banner-title" contenteditable>{{ banner.title | formatString }}</div>
      <div :class="['votes-grid', {'invert-grid' : banner.inverted}]">
        <div :class="['card votes-card votes-card-for', { 'full-column' : banner.abstainColumn === 'against' }]">
          <div class="votes-card-parties">
            <roll-call-party v-for="party in getParties('for')" :key="party.id" :party="party" :showVotes="banner.partyTotals"/>
          </div>
          <div class="votes-card-result">
            <span class="votes-card-result-number">{{ getTotalVotes('for') }}</span>
            <span>A favor</span>
          </div>
        </div>
        <div :class="['card votes-card votes-card-against', { 'full-column' : banner.abstainColumn === 'for' }]">
          <div class="votes-card-parties">
            <roll-call-party v-for="party in getParties('against')" :key="party.id" :party="party" :showVotes="banner.partyTotals"/>
          </div>
          <div class="votes-card-result">
            <span class="votes-card-result-number">{{ getTotalVotes('against') }}</span>
            <span>En contra</span>
          </div></div>
        <div class="card votes-card votes-card-abstain">
          <div class="votes-card-parties">
            <roll-call-party v-for="party in getParties('abstain')" :key="party.id" :party="party" :showVotes="banner.partyTotals"/>
          </div>
          <div class="votes-card-result">
            <span class="votes-card-result-number">{{ getTotalVotes('abstain') }}</span>
            <span>Abstenció</span>
          </div></div>
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
import RollCallParty from './RollCallParty.vue'

export default {
  name: 'roll-call-canvas',

  mixins: [CanvasMixin],

  components: {
    EmojisOnCanvas,
    BannerPicture,
    BannerFrame,
    RollCallParty
  },

  methods: {
    getParties (vote) {
      return this.banner.parties.filter(party => party.voted === vote)
    },

    getTotalVotes (vote) {
      const parties = this.getParties(vote)
      return parties.reduce((previous, current) => {
        return previous + parseInt(current.votes)
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .banner-canvas {
    display: flex;
  }

  .banner-content {
    display: grid;
    height: 100%;
    grid-template-rows: auto 1fr;
    padding: 32px;
    position: relative;
    z-index: 40;
    box-sizing: border-box;
    padding-bottom: 100px;
  }

  .banner-title {
    position: relative;
    color: $white;
    grid-column: span 3;
    font-size: 42px;
    font-weight: bold;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 32px;
    white-space: pre;
    max-height: 4.5em;
    overflow: hidden;
  }

  .banner-picture::v-deep .banner-gradient {
    top: 0 !important;
    bottom: unset;
    transform: rotate(180deg);
  }

  .votes-grid {
    min-height: 350px;
    display: grid;
    align-self: center;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr auto;
    grid-auto-flow: dense;
    gap: 24px;
  }

  .votes-card {
    display: flex;
    flex-direction: column;
    padding: 20px;

    &-parties {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
      margin-bottom: 24px;
    }

    &-result {
      display: flex;
      align-items: center;
      margin-top: auto;
      font-size: 22px;

      &-number {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 34px;
        height: 34px;
        font-size: 18px;
        border-radius: 100%;
        color: $white;
        margin-right: 12px;
      }
    }

    &-for {
      .votes-card-result-number {
        background: $green;
      }
    }

    &-against {
      .votes-card-result-number {
        background: $red;
      }
    }

    &-abstain {
      .votes-card-result-number {
        background: #ffb60a;
      }
    }
  }
  .full-column {
    grid-row: span 2;
  }

  .invert-grid {
    .votes-card-for {
      grid-column: 2;
    }
    .votes-card-against {
      grid-column: 1;
    }
  }
</style>
