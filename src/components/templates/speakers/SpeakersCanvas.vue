<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      `has-${banner.speakers.length}-speakers`,
      'banner-background-' + banner.mode,
      'logo-' + banner.logo
    ]"
    :style="{
      '--speakers': banner.speakers.length
    }"
    v-if="banner">
    <div class="speakers-items">
      <div v-for="(speaker, i) in banner.speakers" :key="i" class="speakers-item">
        <div class="speakers-image">
          <glowy-card
            :picture="speaker.uploadedPicture || speaker.picture"
            :height="cardSize"
            color="none"
            glow-size="sm" />
        </div>
        <div class="speakers-details">
          <div class="speakers-name">{{ speaker.name }}</div>
          <div class="speakers-description">{{ speaker.description }}</div>
        </div>
      </div>
    </div>
    <div class="speakers">
      <div class="speakers-overtitle">
        {{ banner.overtitle | formatString }}
      </div>
      <div
        class="speakers-title"
        :style="{ fontSize: titleSize }">
        {{ banner.title | formatString }}
      </div>
    </div>
    <div class="speakers-details-wrapper" v-if="aspect !== 'event'">
      <event-info color="gradient" icon="calendar-day">{{ banner.date | formatDate }}</event-info>
      <event-info color="gradient" icon="clock">{{ banner.time | formatTime }}</event-info>
      <event-info v-if="banner.eventType === 'inperson'" color="gradient" icon="map-marker-alt">{{ banner.place }}</event-info>
      <div v-if="banner.eventType === 'stream'" class="speakers-social-media">
        <font-awesome-icon v-for="(social, i) in banner.social" :icon="['fab', social]" :key="i" />
      </div>
      <event-info v-if="banner.eventType === 'videochat'" color="gradient" icon="desktop">{{ banner.videochat }}</event-info>
    </div>
    <banner-frame v-if="aspect !== 'event'"/>
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'
import GlowyCard from '@/components/canvas/GlowyCard'
import BannerFrame from '@/components/canvas/BannerFrame'
import EventInfo from '@/components/canvas/EventInfo'

export default {
  name: 'quote-canvas',

  mixins: [CanvasMixin],

  components: {
    BannerFrame,
    GlowyCard,
    EventInfo
  },

  computed: {
    cardSize () {
      const { aspect, banner } = this
      if (aspect === '11') {
        return banner.speakers.length === 2 ? 300 : 275
      } else if (aspect === '916') {
        return banner.speakers.length === 2 ? 120 : 70
      } else {
        return 180
      }
    },

    titleSize () {
      const { fontSize, banner, aspect } = this
      const sizes = {
        11: { min: 35, max: 50 },
        916: { min: 27, max: 40 },
        event: { min: 28, max: 45 }
      }

      return fontSize(banner.title, sizes[aspect].max, sizes[aspect].min, 60)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .speakers {
    position: absolute;
    top: 45px;
    left: 45px;
    right: 45px;
    z-index: 20;
    transition: all .5s ease-in-out;
    font-family: $family-primary;

    &-overtitle {
      font-size: 24px;
      line-height: 1;
      color: $gray-700;
      letter-spacing: -1px;
      margin-bottom: 8px;
    }

    &-title {
      font-size: 42px;
      line-height: 1;
      color: $gray-900;
      letter-spacing: -1px;
      word-wrap: break-word;
      font-weight: bold;
    }

    &-name {
      padding-top: 22px;
      font-size: 19px;
      line-height: 1;
      color: $gray-900;
      font-weight: bold;
      letter-spacing: -0.5px;
    }

    &-description {
      padding-top: 5px;
      font-size: 15px;
      line-height: 1;
      letter-spacing: -0.5px;
      color: $gray-700;
    }

    &-image {
      .glowy-card {
        width: var(--width);
        height: var(--height);
      }

      .glowy-card,
      &::v-deep .glowy-subject,
      &::v-deep .glowy-ghost,
      &::v-deep .glowy-subject img,
      &::v-deep .glowy-ghost img {
        min-height: unset;
        min-width: unset;
      }
    }

    &-items {
      position: absolute;
      top: 25%;
      left: 45px;
      right: 45px;
      display: grid;
      grid-column-gap: 24px;
      justify-content: start;
      grid-template-columns: repeat(var(--speakers), 1fr);
    }

    &-details-wrapper {
      display: flex;
      position: absolute;
      bottom: 16%;
      padding: 0 40px;
    }

    &-social-media {
      font-size: 28px;
      display: flex;
      align-items: center;

      svg {
        margin-right: 8px;

        * {
          fill: url(#iconGradient) !important;
        }
      }
    }
  }

  // Story aspect
  .aspect-916 {
    .speakers {
      top: 65px;
      left: 30px;
      right: 30px;

      &-overtitle{
        font-size: 20px;
      }

      &-items {
        top: 195px;
        left: 30px;
        right: 30px;
        grid-row-gap: 10px;
        grid-column-gap: 0;
        justify-content: center;
        grid-template-columns: 1fr;
        height: 312px;
        align-content: center;
      }

      &-item {
        display: flex;
      }

      &-details {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      &-name {
        padding-top: 0;
        margin-bottom: 5px;
      }

      &-description {
        padding-top: 0;
      }

      &-image {
        width: var(--image-size, 75px);
        border-radius: 100%;
        margin-right: 16px;
        flex-shrink: 0;
      }

      &-details-wrapper {
        padding: 0 30px;
        width: 100%;
        box-sizing: border-box;
        flex-direction: column;
        bottom: 10%;

        .event-info {
          margin-top: 16px;
        }
      }

      &-details {
        margin: 7px 0;
        font-size: 19px;
      }

      &-social-media {
        margin: 16px 4px 0;
      }
    }

    &.has-2-speakers {
      .speakers-item {
        --image-size: 120px;
      }
    }

    .glowy-card::v-deep .glowy-subject,
    .glowy-card::v-deep .glowy-ghost {
      border-radius: 8px;
    }
  }

    // Event aspect
    .aspect-event {
      .speakers {
        top: 25px;

        &-items {
          top: 135px;
        }

        &-name {
          font-size: 16px;
        }

        &-description {
          font-size: 13px;
        }
      }
    }

  //Dark background
  .banner-canvas.banner-background-black {
    .event-info, .speakers-title, .speakers-name {
      color: $white;
    }

    .speakers-subtitle, .speakers-overtitle, .speakers-description {
      color: $gray-400;
    }
  }
</style>
