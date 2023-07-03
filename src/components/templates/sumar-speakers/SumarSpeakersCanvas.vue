<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-speakers',
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
    <div class="event-header">
      <div class="event-overtitle">
        {{ banner.overtitle | formatString }}
      </div>
      <div
        class="event-title"
        :style="{ fontSize: titleSize }">
        {{ banner.title | formatString }}
      </div>
    </div>
    <div class="speaker-pictures">
      <div v-for="(speaker, i) in banner.speakers" :key="i" class="speaker-picture">
        <img :src="speaker.uploadedPicture || speaker.picture" alt="" v-if="speaker.uploadedPicture || speaker.picture" />
      </div>
    </div>
    <div class="speaker-details">
      <div v-for="(speaker, i) in banner.speakers" :key="i" class="speaker">
        <div class="speaker-name" contenteditable>{{ speaker.name }}</div>
        <div class="speaker-description" contenteditable>{{ speaker.description }}</div>
      </div>
    </div>
    <div class="event-details">
      <event-info icon="calendar-day" color="current" class="date">{{ banner.date | formatDate }}</event-info>
      <event-info icon="clock" color="current">{{ banner.time | formatTime }}</event-info>
      <event-info icon="map-marker-alt" color="current">{{ banner.place }}</event-info>
    </div>
    <div class="logos">
      <compromis-logo class="logo-compromis" />
      <sumar-logo class="logo-sumar" />
    </div>
  </div>
</template>

<script>
import SumarLogo from './SumarLogo'
import CompromisLogo from '@/components/utils/CompromisLogo'
import CanvasMixin from '@/mixins/canvas-mixin.js'
import EventInfo from '@/components/canvas/EventInfo'

export default {
  name: 'quote-canvas',

  mixins: [CanvasMixin],

  components: {
    EventInfo,
    CompromisLogo,
    SumarLogo
  },

  computed: {
    titleSize () {
      const { fontSize, banner, aspect } = this
      const sizes = {
        11: { min: 50, max: 70 },
        916: { min: 27, max: 40 }
      }

      return fontSize(banner.title, sizes[aspect].max, sizes[aspect].min, 60)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  @font-face {
    font-family: 'Roobert';
    src: url('../granissat/resources/Roobert-Bold.woff2') format('woff2'),
      url('../granissat/resources/Roobert-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Roobert';
    src: url('../granissat/resources/Roobert-Medium.woff2') format('woff2'),
      url('../granissat/resources/Roobert-Medium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  .banner-speakers {
    --spacer: 16px;
    --radius: 10px;
    --fuchsia: #e82a5a;
    --orange: #f37037;
    font-family: Roobert, sans-serif;
  }

  .event-header {
    height: 140px;
    margin: var(--spacer);
    line-height: 1;

    .event-overtitle {
      color: $gray-700;
      font-size: 28px;
    }

    .event-title {
      font-weight: bold;
    }
  }

  .speaker-pictures {
    height: 250px;
    display: flex;
    margin: 0 var(--spacer);
    gap: var(--spacer);

    .speaker-picture {
      display: flex;
      width: 100%;
      border-radius: var(--radius);
      background: $gray-100;

      img {
        display: block;
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: var(--radius);
      }
    }
  }

  .speaker-details {
    display: flex;
    height: 120px;
    margin: var(--spacer);
    gap: var(--spacer);

    .speaker {
      display: flex;
      flex-direction: column;
      width: 100%;
      border-radius: var(--radius);
      padding: var(--spacer);
      color: $white;
      line-height: 1;

      &:nth-child(odd) {
        background: var(--fuchsia);
      }

      &:nth-child(even) {
        background: var(--orange);
      }

      &-name {
        font-weight: bold;
        font-size: 22px;
        margin-bottom: 6px;
      }

      &-description {
        font-size: 18px;
        margin-top: auto;
      }
    }
  }

  .event-details {
    height: 40px;
    background: $gray-100;
    display: flex;
    margin: var(--spacer);
    border-radius: var(--radius);
    padding: var(--spacer);
    font-size: 80px;

    .date {
      min-width: 175px;
      flex-shrink: 0;
    }

    & > .event-info::v-deep {
      font-size: 20px;

    }
  }

  .logos {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    padding: var(--spacer);

    .logo-compromis {
      height: 35px;
    }

    .logo-sumar {
      height: 35px;
      margin-left: auto;
    }
  }
</style>
