<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      `has-${banner.speakers.length}-speakers`,
      'primary-' + banner.bgColor,
      'secondary-' + banner.secondaryColor,
    ]"
    v-if="banner">
    <div class="grid">
      <div class="speakers-title" :style="{ fontSize: titleSize }">
        {{ banner.title | formatString }}
      </div>
      <div class="speakers-items">
        <div v-for="(speaker, i) in banner.speakers" :key="i" class="speaker">
          <div class="speaker-image">
            <img :src="speaker.uploadedPicture || speaker.picture" alt="" />
          </div>
          <div class="speaker-details">
            <div class="speaker-name">{{ speaker.name }}</div>
            <div class="speaker-description">{{ speaker.description }}</div>
          </div>
        </div>
      </div>
      <div class="speakers-details">
        <div class="speakers-overtitle">
          {{ banner.overtitle | formatString }}
        </div>
        <div class="speakers-date">
          <event-info color="current" icon="calendar-day">{{ banner.date | formatDate }}</event-info>
          <event-info color="current" icon="clock">{{ banner.time | formatTime }}</event-info>
          <div v-if="banner.eventType === 'stream'" class="speakers-social-media">
            <font-awesome-icon v-for="(social, i) in banner.social" :icon="['fab', social]" :key="i" />
          </div>
        </div>
        <div class="speakers-venue">
          <event-info v-if="banner.eventType === 'inperson'" color="current" icon="map-marker-alt">{{ banner.place }}</event-info>
          <event-info v-if="banner.eventType === 'videochat'" color="current" icon="desktop">{{ banner.videochat }}</event-info>
        </div>
        <multi-logo class="logo" v-if="aspect !== '916'" />
      </div>
    </div>
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'
import EventInfo from '@/components/canvas/EventInfo'
import MultiLogo from '@/components/canvas/MultiLogo'

export default {
  name: 'quote-canvas',

  mixins: [CanvasMixin],

  components: {
    EventInfo,
    MultiLogo
  },

  computed: {
    titleSize () {
      const { fontSize, banner } = this
      const sizes = {
        min: 50,
        max: 70
      }

      return fontSize(banner.title, sizes.max, sizes.min, 60)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../../sass/variables";
  @import "../resources/fonts";
  @import "../resources/colors";

  @each $name, $props in $granissat-colors {
    .primary-#{$name} {
      --primary-bg: #{map-get($props, 'bg')};
      --primary-text: #{map-get($props, 'text')};
    }

    .secondary-#{$name} {
      --secondary-bg: #{map-get($props, 'bg')};
      --secondary-text: #{map-get($props, 'text')};
    }
  }

  .grid {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--primary-bg);
    z-index: 1;
    display: grid;
    grid-template-rows: auto 1fr auto;
    --banner-padding: 24px;
  }

  .speakers {
    &-title {
      font-family: $granissat-font;
      line-height: 1.1;
      padding: var(--banner-padding);
      color: var(--primary-text);
    }

    &-items {
      display: flex;
      padding: var(--banner-padding);
      padding-top: 0;
      gap: var(--banner-padding);

      .speaker {
        flex-grow: 1;
        width: 100%;
        display: grid;
        grid-template-rows: 1fr auto;
        gap: calc(var(--banner-padding) / 2);

        &-image {
          background: $gray-300;
        }

        &-details {
          color: var(--primary-text);
          font-size: 20px;
          line-height: 1.1;
        }

        &-name {
          font-weight: 900;
        }

        &-description {
          font-size: 16px;
          margin-top: 6px;
        }
      }
    }

    &-details {
      background: var(--secondary-bg);
      padding: var(--banner-padding);
      color: var(--secondary-text);

      .event-info {
        font-size: 20px;
      }
    }

    &-overtitle {
      font-weight: 900;
      margin-bottom: calc(var(--banner-padding) / 2);
      font-size: 24px;
      letter-spacing: -0.03em;
    }

    &-date {
      display: flex;
      margin-bottom: calc(var(--banner-padding) / 2);
    }

    &-venue {
      margin-bottom: var(--banner-padding);
    }

    &-social-media {
      font-size: var(--banner-padding);

      svg {
        margin-right: calc(var(--banner-padding) / 2);
      }
    }
  }
</style>
