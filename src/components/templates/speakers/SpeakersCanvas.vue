<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      aspect === '11' ? 'disposition-' + banner.disposition : '',
      banner.localLabel && banner.hasLocalLabel ? 'has-local-label' : '',
      banner.title.length > 30 && banner.speakers.length !== 2 ? 'has-long-title' : 'has-short-title',
      `has-${banner.speakers.length}-speakers`,
      'blobs-' + color
    ]"
    v-if="banner">
    <div class="speakers-items">
      <div v-for="(speaker, i) in banner.speakers" :key="i" class="speakers-item">
        <div class="speakers-image">
          <img :src="speaker.picture" :alt="`Imatge de ${speaker.name}`" v-if="speaker.picture" />
        </div>
        <div class="speakers-name">{{ speaker.name }}</div>
        <div class="speakers-description">{{ speaker.description }}</div>
      </div>
    </div>
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="speakers">
      <div class="speakers-overtitle">
        {{ banner.overtitle | formatString }}
      </div>
      <div
        class="speakers-title"
        :style="{
          fontSize: aspect === '11'
            ? fontSize('title', 50, 35 , 60)
            : aspect === 'event'
            ? fontSize('title', 45, 28 , 60)
            : fontSize('title', 40, 27 , 60)
        }">
        {{ banner.title | formatString }}
      </div>
    </div>
    <div class="speakers-details-wrapper" v-if="aspect !== 'event'">
      <div class="speakers-details speakers-date" contenteditable>
        <font-awesome-icon :icon="['far', 'calendar-day']" fixed-width /> {{ banner.date | formatDate }}
      </div>
      <div class="speakers-details" contenteditable>
        <font-awesome-icon :icon="['far', 'clock']" fixed-width /> {{ banner.time | formatTime }}
      </div>
      <div class="speakers-details" contenteditable>
        <font-awesome-icon :icon="['far', 'map-marker-alt']" fixed-width /> {{ banner.place }}
      </div>
    </div>
    <div class="logo">
      <compromis-logo />
      <div :class="{ 'logo-local-label': true, 'logo-local-label--long': banner.localLabel.length > 18 }" v-if="banner.localLabel && banner.hasLocalLabel">
        {{ banner.localLabel | formatLocal }}
      </div>
    </div>
    <svg width="0" height="0">
      <radialGradient id="compromisGradient" r="150%" cx="30%" cy="107%">
        <stop class="gradient-start" offset="0" />
        <stop class="gradient-end" offset="1" />
      </radialGradient>
    </svg>
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'

export default {
  name: 'quote-canvas',

  mixins: [CanvasMixin]
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .speakers {
    position: absolute;
    top: 45px;
    left: 0;
    z-index: 40;
    padding: 0 45px;
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
      width: 325px;
    }

    &-name {
      padding-top: 12px;
      font-size: 18px;
      line-height: 1;
      color: $gray-900;
      font-weight: bold;
      letter-spacing: -0.5px;
    }

    &-description {
      padding-top: 4px;
      font-size: 14px;
      line-height: 1;
      letter-spacing: -0.5px;
      color: $gray-700;
    }

    &-image {
      height: 200px;
      border-radius: 16px;
      overflow: hidden;
      background: $gray-200;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &-items {
      position: absolute;
      top: 30%;
      left: 45px;
      right: 45px;
      display: grid;
      margin-top: 16px;
      grid-column-gap: 15px;
      justify-content: start;
      grid-template-columns: repeat(auto-fit, var(--image-size, 200px));
    }

    &-details-wrapper {
      display: flex;
      position: absolute;
      bottom: 18%;
      padding: 0 45px;
    }

    &-details {
      display: flex;
      align-items: center;
      font-size: 18px;
      letter-spacing: -1px;
      width: auto;
      color: $gray-700;
      padding-right: 20px;
      line-height: 1.1;

      svg {
        padding-right: 8px;
        font-size: 28px;

        * {
          fill: url(#compromisGradient) !important;
        }
      }
    }

    &-date {
      white-space: nowrap;
      flex-shrink: 0;
    }
  }

  .blob {
    &-1 {
      top: -83%;
      left: 50%;
    }

    &-2 {
      left: -50%;
      bottom: -90%;
      z-index: 10;
    }
  }

  .has-long-title {
    .blob-1 {
      top: -93%;
    }

    .speakers {
      top: 80px;

      &-title {
        width: auto;
      }
    }
  }

  .has-2-speakers {
    .blob-1 {
      top: -42%;
      left: 69%;
    }
  }

  .has-4-speakers {
    .speakers {
      &-items {
        --image-size: 145px;
      }

      &-image {
        height: 145px;
      }
    }
  }

  .has-local-label {
    .blob-2 {
      left: -60%;
    }
  }

  .blobs-lgtb.has-2-speakers .blob-1 {
    background-size: 100% 68%;
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
