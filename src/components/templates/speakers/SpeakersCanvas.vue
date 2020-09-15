<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      `has-${banner.speakers.length}-speakers`,
    ]"
    :style="{
      '--speakers': banner.speakers.length
    }"
    v-if="banner">
    <div class="speakers-items">
      <div v-for="(speaker, i) in banner.speakers" :key="i" class="speakers-item">
        <div class="speakers-image">
          <glowy-card :picture="speaker.picture" :height="250" gradient="none" />
        </div>
        <div class="speakers-name">{{ speaker.name }}</div>
        <div class="speakers-description">{{ speaker.description }}</div>
      </div>
    </div>
    <div class="speakers">
      <div class="speakers-overtitle">
        {{ banner.overtitle | formatString }}
      </div>
      <div
        class="speakers-title"
        :style="{
          fontSize: aspect === '11'
            ? fontSize(banner.title, 50, 35 , 60)
            : aspect === 'event'
              ? fontSize(banner.title, 45, 28 , 60)
              : fontSize(banner.title, 40, 27 , 60)
        }">
        {{ banner.title | formatString }}
      </div>
    </div>
    <div class="speakers-details-wrapper" v-if="aspect !== 'event'">
      <event-info color="gradient" icon="calendar-day">{{ banner.date | formatDate }}</event-info>
      <event-info color="gradient" icon="clock">{{ banner.time | formatTime }}</event-info>
      <event-info color="gradient" icon="map-marker-alt">{{ banner.place }}</event-info>
    </div>
    <banner-frame
      theme="glowy"
      :hashtag="banner.hashtag"
      :local-label="banner.localLabel"
      :aspect="aspect" />
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'
import GlowyCard from '@/utils/GlowyCard'
import BannerFrame from '@/utils/BannerFrame'
import EventInfo from '@/utils/EventInfo'

export default {
  name: 'quote-canvas',

  mixins: [CanvasMixin],

  components: {
    BannerFrame,
    GlowyCard,
    EventInfo
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
      top: 22%;
      left: 45px;
      right: 45px;
      display: grid;
      margin-top: 16px;
      grid-column-gap: 24px;
      justify-content: start;
      grid-template-columns: repeat(var(--speakers), 1fr);
    }

    &-details-wrapper {
      display: flex;
      position: absolute;
      bottom: 18%;
      padding: 0 45px;
    }
  }

  // Story aspect
  .aspect-916 {
    .blob {
      &-1 {
        left: -125%;
        top: -88%;
      }

      &-2 {
        left: 60%;
        bottom: -88%;
        --gradient-orientation: -45deg;
      }

      &-image {
        height: 540px;
        top: -160px;
        left: -12px;
        border-bottom-right-radius: 0;
      }
    }

    .speakers {
      padding: 0 30px;
      box-sizing: border-box;
      width: 100%;
      top: 98px;

      &-overtitle{
        font-size: 20px;
      }

      &-items {
        top: 30%;
        left: 30px;
        right: 30px;
        grid-row-gap: 10px;
        grid-column-gap: 0;
        justify-content: start;
        grid-template-columns: 1fr;
        height: 250px;
        align-content: center;
      }

      &-item {
        display: grid;
        grid-template-columns: var(--image-size, 75px) auto;
        grid-template-rows: 1fr 1fr;
        grid-template-areas:
          "image name"
          "image description";
        grid-column-gap: 10px;
        grid-row-gap: 5px;
      }

      &-name {
        grid-area: name;
        align-self: end;
      }

      &-description {
        grid-area: description;
        align-self: start;
      }

      &-image {
        grid-area: image;
        height: 75px;
        border-radius: 100%;
      }

      &-details-wrapper {
        padding: 0 30px;
        width: 100%;
        box-sizing: border-box;
        flex-direction: column;
        bottom: 10%;
      }

      &-details {
        margin: 7px 0;
        font-size: 19px;

        svg {
          margin-right: 4px;
        }
      }
    }

    &.has-2-speakers {
      .speakers {
        &-item {
          --image-size: 90px;
        }

        &-image {
          height: 90px;
        }
      }
    }

    &.has-4-speakers {
      .speakers {
        &-item {
          --image-size: 60px;
          grid-row-gap: 0;
        }

        &-image {
          height: 60px;
        }
      }
    }

    .logo {
      display: none;
    }
  }

    // Event aspect
  .aspect-event {
    .blob {
      &-1 {
        top: 81%;
        left: -64%;
        z-index: 20;
      }

      &-2 {
        left: auto;
        bottom: 81%;
        right: -61%;
        z-index: 20;
      }
    }

    .speakers {
      top: 0;
      padding: 30px;

      &-items {
        left: 30px;
        right: 30px;
        justify-content: end;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        margin-top: 18px;
      }

      &-name, &-description {
        display: none;
      }

      &-title {
        width: 400px;
      }

      &-overtitle {
        margin-bottom: 6px;
        font-size: 20px;
      }
    }

    &.has-3-speakers {
      .blob-1 {
        top: 87%;
      }

      .speakers-image {
        height: 170px;
      }
    }

    &.has-2-speakers {
      .speakers-items {
        left: 260px;
      }

      .speakers-title {
        width: 200px;
      }
    }

    .logo {
      display: none;
    }
  }
</style>
