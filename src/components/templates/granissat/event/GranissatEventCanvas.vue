<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="['banner-canvas','aspect-' + aspect, 'disposition-' + banner.disposition, 'color-' + banner.bgColor]"
    v-if="banner">
    <div class="event-grid">
      <banner-picture
        :picture-position="backgroundPosition"
        :height="aspect === 'event' ? 420 : null" />
      <div :class="['event', `event-${banner.disposition}`]">
        <div class="event-overtitle" v-if="banner.overtitle">
          {{ banner.overtitle | formatString }}
        </div>
        <div class="event-title" :style="{ fontSize: fontSize(banner.title, 55, 35, 60) }">
          {{ banner.title | formatString }}
        </div>
        <div class="event-details event-details--speakers" v-if="banner.speakers.length > 0 && aspect === '11'">
          <event-info color="current" icon="keynote" class="event-info-speakers">
            <ul class="speakers-grid">
              <li v-for="(speaker, i) in banner.speakers" :key="i">
                <div class="speakers-grid-name">{{ speaker.name }}</div>
                <div class="speakers-grid-description">{{ speaker.description }}</div>
              </li>
            </ul>
          </event-info>
        </div>
        <div class="event-details event-bar" v-if="aspect !== 'event'">
          <event-info color="current" icon="calendar-day">{{ banner.date | formatDate }}</event-info>
          <event-info color="current" icon="clock">{{ banner.time | formatTime }}</event-info>
          <event-info color="current" v-if="banner.eventType === 'inperson'" icon="map-marker-alt">{{ banner.place }}</event-info>
          <div v-if="banner.eventType === 'stream'" class="event-social-media">
            <font-awesome-icon v-for="(social, i) in banner.social" :icon="['fab', social]" :key="i" />
          </div>
          <event-info v-if="banner.eventType === 'videochat'" icon="desktop">{{ banner.videochat }}</event-info>
        </div>
      </div>
    </div>
    <banner-frame />
    <div class="claim">
      Som molt<br />de tu.<br />Som molt<br />d'ací.
    </div>
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'
import EventInfo from '@/components/canvas/EventInfo'
import BannerPicture from '@/components/canvas/BannerPicture'
import BannerFrame from '@/components/canvas/BannerFrame'

export default {
  mixins: [CanvasMixin],

  components: {
    EventInfo,
    BannerPicture,
    BannerFrame
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../../sass/variables";
  @import "../resources/fonts";
  @import "../resources/colors";

  .event {
    display: flex;
    flex-direction: column;
    justify-content: center;
    left: 0;
    z-index: 40;
    padding: 25px;
    z-index: 20;
    transition: all .5s ease-in-out;
    font-family: $family-primary;
    max-height: 575px;
    background: var(--primary-bg);
    position: absolute;
    bottom: 100px;
    left: 0;
    right: 70px;

    &-title {
      display: block;
      font-size: 32px;
      line-height: 1;
      color: $white;
      letter-spacing: -1px;
      word-wrap: break-word;
      font-family: $family-primary;
      font-weight: bold;
      padding-bottom: 25px;
    }

    &-subtitle {
      display: flex;
      align-items: center;
      font-size: 19px;
      letter-spacing: -0.5px;
      color: $white;
      line-height: 1.1;
      margin-bottom: 12px;
    }

    &-overtitle {
      display: flex;
      align-items: center;
      font-size: 19px;
      letter-spacing: -0.5px;
      color: $white;
      line-height: 1.1;
    }

    &-info {
      color: $white !important;
    }

    &-details {
      margin-top: 16px;
      display: flex;
      font-size: 18px;
      letter-spacing: -0.5px;

      &--speakers {
        display: flex;
        flex-direction: row;
        padding: 0 16px 16px;
        margin: 12px -20px 0 -20px;
      }
    }

    &-day, &-time {
      display: flex;
      align-content: center;
      padding-top: 12px;
      color: $white;
    }

    .icon {
      padding-right: 5px;
    }

    &-info-speakers {
      align-items: flex-start;
      width: 100%;
    }

    &-social-media {
      font-size: 28px;
      display: flex;
      align-items: center;

      svg {
        margin-right: 8px;
      }
    }

    &-bar {
      background: var(--secondary-bg);
      padding: 20px;
      margin: 0 -25px -25px -25px;
    }
  }

  .event-grid {
    display: grid;
    grid-template-rows: 1fr auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    .banner-picture {
      display: flex;
    }

    .banner-picture::v-deep .glowy-card,
    .banner-picture::v-deep .glowy-subject,
    .banner-picture::v-deep .glowy-ghost {
      min-height: 250px;
    }
  }

  .speakers-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 12px;
    margin-bottom: 8px;
    grid-auto-rows: auto;
    width: 100%;
    letter-spacing: -0.03em;

    &-name {
      color: $white;
    }

    &-description {
      font-size: 14px;
      letter-spacing: -0.02em;
      margin-top: 6px;
    }
  }

  .banner-picture {
    background: $gray-300;
  }

  .disposition-right, .disposition-left, .aspect-916 {
    .speakers-grid {
      grid-template-columns: 1fr;
    }

    .event-social-media {
      margin: 8px 4px 0;
    }
  }

  // Story aspect
  .aspect-916 {
    .event {
      display: flex;
      align-content: center;
      margin-top: -105px;
      padding: 20px 20px 0 20px;

      &-details {
        padding-top: 12px;
        flex-direction: column;
      }

      &-info {
        margin-bottom: 4px;
      }

      &-grid {
        bottom: 60px;
      }
    }
  }

  .aspect-event {
    .event {
      justify-content: flex-end;
      height: 100%;
    }

    .banner-picture {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
    }
  }

.claim {
  color: $white;
  font-family: $granissat-font;
  font-weight: 900;
  font-size: 24px;
  line-height: 1;
  position: absolute;
  top: 25px;
  left: 25px;
  z-index: 40;
}

.color-red {
  --primary-bg: #{$granissat-red};
  --secondary-bg: #{$granissat-blue};
}

.color-yellow {
  --primary-bg: #{$granissat-yellow};
  --secondary-bg: #{$granissat-red};
}

.color-blue {
  --primary-bg: #{$granissat-blue};
  --secondary-bg: #{$granissat-yellow};
}

.color-pink {
  --primary-bg: #{$granissat-pink};
  --secondary-bg: #{$granissat-yellow};
}

.color-indigo {
  --primary-bg: #{$granissat-indigo};
  --secondary-bg: #{$granissat-yellow};
}
</style>
