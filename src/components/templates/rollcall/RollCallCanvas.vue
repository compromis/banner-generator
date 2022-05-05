<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      'banner-background-' + banner.mode,
      'logo-' + banner.logo,
      { 'inverted-background': banner.title.length > 0 && banner.picture }
    ]"
    v-if="banner">
    <div class="banner-content">
      <div class="banner-title" contenteditable>{{ banner.title | formatString }}</div>
      <div :class="['votes-grid', {'invert-grid' : banner.inverted}]">
        <div :class="['card votes-card votes-card-for', { 'full-column' : banner.abstainColumn === 'against' || !hasAbstain, 'winner': winner === 'for' && banner.highlightWinner }]">
          <div class="votes-card-parties">
            <roll-call-party v-for="party in getParties('for')" :key="party.id" :party="party" :showVotes="banner.partyTotals"/>
          </div>
          <div class="votes-card-result">
            <span class="votes-card-result-number">{{ getTotalVotes('for') }}</span>
            <span>A favor</span>
            <font-awesome-icon :icon="['far', 'check']" class="winner-icon" v-if="winner === 'for' && banner.highlightWinner" />
          </div>
        </div>
        <div :class="['card votes-card votes-card-against', { 'full-column' : banner.abstainColumn === 'for' || !hasAbstain, 'winner': winner === 'against' && banner.highlightWinner }]">
          <div class="votes-card-parties">
            <roll-call-party v-for="party in getParties('against')" :key="party.id" :party="party" :showVotes="banner.partyTotals"/>
          </div>
          <div class="votes-card-result">
            <span class="votes-card-result-number">{{ getTotalVotes('against') }}</span>
            <span>En contra</span>
            <font-awesome-icon :icon="['far', 'check']" class="winner-icon" v-if="winner === 'against' && banner.highlightWinner" />
          </div></div>
        <div v-if="hasAbstain" :class="['card votes-card votes-card-abstain', { 'small-abstain': banner.smallAbstain }]">
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
    <banner-picture :picture-position="backgroundPosition" />
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

  computed: {
    winner () {
      const votesFor = this.getTotalVotes('for')
      const votesAgainst = this.getTotalVotes('against')

      return votesFor > votesAgainst ? 'for' : 'against'
    },

    hasAbstain () {
      return this.getParties('abstain').length > 0
    }
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
    flex-grow: 1;
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr;
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
    line-height: 1.22;
    letter-spacing: -0.02em;
    margin-bottom: 32px;
    white-space: pre-wrap;
    max-height: 4.5em;
    overflow: hidden;
  }

  .votes-grid {
    min-height: 350px;
    display: grid;
    align-self: center;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
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
        background: var(--vote-color);
      }
    }

    &-for {
      --vote-color: #{$green};
    }

    &-against {
      --vote-color: #{$red};
    }

    &-abstain {
      --vote-color: #ffb60a;

      &.small-abstain {
        .votes-card-result {
          font-size: 16px;

          &-number {
            font-size: 13px;
            height: 24px;
            width: 24px;
            margin-right: 8px;
          }
        }

        .votes-card-parties {
          grid-template-columns: repeat(5, 1fr);
          gap: 8px;

          .party {
            border-radius: 8px;

            &::v-deep .party-name {
              height: 48px;
              width: 48px;
              font-size: 12px !important;
            }

            &::v-deep .party-votes {
              font-size: 10px;
              height: 22px;
              width: 22px;
            }
          }
        }
      }
    }
  }

  .winner {
    .votes-card-result {
      font-weight: bold;
      color: var(--vote-color);
    }

    &-icon {
      margin-left: auto;
      font-size: 30px;
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

  .aspect-916 {
    .banner-content {
      padding: 66px 18px;
    }
    .banner-title {
      white-space: normal;
      font-size: 28px;
      margin-bottom: 16px;
    }
    .votes-grid {
      grid-template-columns: 1fr;
      gap: 18px;
    }

    .votes-card {
      padding: 14px;

      &-parties {
        grid-template-columns: 1fr 1fr 1fr 1fr;
        margin-bottom: 16px;
      }

      &-result {
        font-size: 16px;

        &-number {
          font-size: 13px;
          height: 24px;
          width: 24px;
          margin-right: 8px;
        }
      }
    }

    .full-column {
      grid-row: span 1;
    }

  .invert-grid {
      .votes-card-for {
        grid-column: 1;
        grid-row: 2;
      }

      .votes-card-against {
        grid-column: 1;
        grid-row: 1;
      }
    }

    .winner-icon {
      font-size: 20px;
    }
  }
</style>
