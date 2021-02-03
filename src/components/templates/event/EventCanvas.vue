<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      'disposition-' + banner.disposition,
      'banner-background-' + banner.mode,
      'logo-' + banner.logo
    ]"
    v-if="banner">
    <div class="event-grid">
      <banner-picture
        :picture-position="objectPosition"
        edge
        :height="aspect === 'event' ? 420 : null" />
      <div class="event">
        <span>{{ banner.aspect }}</span>
        <div class="event-overtitle">
          <span v-if="aspect === '11'">{{ banner.overtitle | formatString }}</span>
          <text-in-pills
            v-else
            :text="banner.overtitle"
            fontSize="20px" />
        </div>
        <div class="event-title" :style="{fontSize: fontSize(banner.title, 60, 40, 60)}">
          <span v-if="aspect === '11'">{{ banner.title | formatString }}</span>
          <text-in-pills
            v-else
            :text="banner.title"
            :fontSize="fontSize(banner.title, 50, 35, 60)" />
        </div>
        <div class="event-details event-details--speakers" v-if="banner.speakers.length > 0 && aspect !== 'event'">
          <event-info color="gradient" icon="keynote">{{ speakers }}</event-info>
        </div>
        <div class="event-details" v-if="aspect !== 'event'">
          <event-info color="gradient" icon="calendar-day">{{ banner.date | formatDate }}</event-info>
          <event-info color="gradient" icon="clock">{{ banner.time | formatTime }}</event-info>
          <event-info color="gradient" icon="map-marker-alt">{{ banner.place }}</event-info>
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
  },

  computed: {
    speakers () {
      const speakers = this.banner.speakers.map(speaker => speaker.name)
      return (speakers.length === 1) ? speakers[0] : speakers.slice(0, speakers.length - 1).join(', ').concat(' i ' + speakers[speakers.length - 1])
    }
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

      .banner-picture::v-deep .glowy-card {
        min-height: 300px;
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
        margin-bottom: 10px;
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
    .event-info, .event-title, .event-name {
      color: $white;
    }

    .event-subtitle, .event-overtitle, .event-description {
      color: $gray-400;
    }
  }
</style>
