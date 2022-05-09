<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      'disposition-' + banner.disposition,
      'banner-background-' + banner.mode,
      'theme-' + banner.theme,
      'logo-' + banner.logo
    ]"
    v-if="banner">
    <div class="event-grid">
      <banner-picture
        :picture-position="backgroundPosition"
        :edge="banner.theme !== 'glowy' ? false : true"
        :height="aspect === 'event' ? 420 : null" />
      <div :class="['event', `event-${banner.disposition}`, {'card': banner.theme !== 'glowy'}]">
        <div class="event-overtitle">
          <span v-if="aspect === '11' || banner.theme !== 'glowy'">{{ banner.overtitle | formatString }}</span>
          <text-in-pills
            v-else
            :text="banner.overtitle"
            fontSize="20px" />
        </div>
        <div class="event-title" :style="{fontSize: fontSize(banner.title, 55, 35, 60)}">
          <span v-if="aspect === '11' || banner.theme !== 'glowy'">{{ banner.title | formatString }}</span>
          <text-in-pills
            v-else
            :text="banner.title"
            :fontSize="fontSize(banner.title, 50, 35, 60)" />
        </div>
        <div class="event-details event-details--speakers" v-if="banner.speakers.length > 0 && aspect === '11'">
          <event-info color="gradient" icon="keynote" class="event-info-speakers">
            <ul class="speakers-grid">
              <li v-for="(speaker, i) in banner.speakers" :key="i">
                <div class="speakers-grid-name">{{ speaker.name }}</div>
                <div class="speakers-grid-description">{{ speaker.description }}</div>
              </li>
            </ul>
          </event-info>
        </div>
        <div class="event-details event-details" v-if="aspect !== 'event'">
          <event-info color="gradient" icon="calendar-day">{{ banner.date | formatDate }}</event-info>
          <event-info color="gradient" icon="clock">{{ banner.time | formatTime }}</event-info>
          <event-info v-if="banner.eventType === 'inperson'" color="gradient" icon="map-marker-alt">{{ banner.place }}</event-info>
          <div v-if="banner.eventType === 'stream'" class="event-social-media">
            <font-awesome-icon v-for="(social, i) in banner.social" :icon="['fab', social]" :key="i" />
          </div>
          <event-info v-if="banner.eventType === 'videochat'" color="gradient" icon="desktop">{{ banner.videochat }}</event-info>
        </div>
      </div>
    </div>
    <banner-frame />
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'
import BannerPicture from '@/components/canvas/BannerPicture'
import BannerFrame from '@/components/canvas/BannerFrame'
import EventInfo from '@/components/canvas/EventInfo'
import TextInPills from '@/components/canvas/TextInPills'

export default {
  name: 'event-canvas',

  mixins: [CanvasMixin],

  components: {
    BannerPicture,
    BannerFrame,
    EventInfo,
    TextInPills
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .event {
    display: flex;
    flex-direction: column;
    justify-content: center;
    left: 0;
    z-index: 40;
    padding: 35px 35px 0 35px;
    z-index: 20;
    transition: all .5s ease-in-out;
    font-family: $family-primary;
    max-height: 575px;

    &-title {
      display: block;
      font-size: 32px;
      line-height: 1;
      color: $gray-900;
      letter-spacing: -1px;
      word-wrap: break-word;
      font-family: $family-primary;
      font-weight: bold;
      margin: 10px 0;
    }

    &-subtitle {
      display: flex;
      align-items: center;
      font-size: 19px;
      letter-spacing: -0.5px;
      color: $gray-700;
      line-height: 1.1;
      margin-bottom: 12px;
    }

    &-overtitle {
      display: flex;
      align-items: center;
      font-size: 19px;
      letter-spacing: -0.5px;
      color: $gray-700;
      line-height: 1.1;
    }

    &-details {
      margin-top: 16px;
      display: flex;
      font-size: 18px;
      letter-spacing: -0.5px;

      &--speakers {
        display: flex;
        flex-direction: row;
        border-bottom: 1px $gray-300 solid;
        padding: 0 16px 16px;
        margin: 12px -20px 0 -20px;
      }
    }

    &-day, &-time {
      display: flex;
      align-content: center;
      padding-top: 12px;
      color: $gray-700;
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

        * {
          fill: url(#iconGradient) !important;
        }
      }
    }
  }

  .event-grid {
    display: grid;
    grid-template-rows: 1fr auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 80px;

    .banner-picture {
      display: flex;
    }

    .banner-picture::v-deep .glowy-card,  .banner-picture::v-deep .glowy-subject, .banner-picture::v-deep .glowy-ghost{
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
      color: $gray-darkest
    }

    &-description {
      font-size: 14px;
      letter-spacing: -0.02em;
      margin-top: 6px;
    }
  }

  .theme-glowy {
    .event-details--speakers {
      padding: 16px 0;
      margin: 0;
    }
  }

  .disposition-right:not(.theme-glowy), .disposition-left:not(.theme-glowy), .aspect-916 {
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

  //Dark background
  .banner-canvas.banner-background-black {
    .event-info, .event-title, .event-name, .speakers-grid-name {
      color: $white;
    }

    .event-subtitle, .event-overtitle, .event-description, .speakers-grid-description {
      color: $gray-400;
    }

    .event-details--speakers {
      border-color: $gray-700;
    }
  }

  //Blobs and no blobs
  .theme-blobless, .theme-blobs {
    .event {
      padding: 20px;
      position: absolute;
      left: 35px;
      bottom: 90px;
      width: 608px;
      z-index: 30;
    }

    .event-left {
      width: 275px;
    }

    .event-right {
      width: 275px;
      left: auto;
      right: 35px;
    }

    .event-grid {
      bottom: 0;
    }

    .event-right, .event-left {
      .event-details {
        flex-direction: column;
      }

      .event-info:not(:first-child) {
        margin-top: 10px;
      }
    }

    &.aspect-916 {
      .event {
        left: 20px;
        width: 325px;
      }
    }
  }
</style>
