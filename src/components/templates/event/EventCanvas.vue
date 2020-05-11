<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      banner.localLabel ? 'has-local-label' : '',
      aspect === '11' ? 'disposition-' + banner.disposition : '',
      isCrowded ? 'is-crowded' : '',
      'blobs-' + color
    ]"
    v-if="banner">
    <div class="blob blob-image">
      <img :src="banner.picturePreview" alt="Imatge" v-if="banner.picturePreview" :style="objectPosition" />
    </div>
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="event">
      <div class="event-overtitle">
        <span>{{ banner.overtitle | formatString }}</span>
      </div>
      <div v-if="banner.title" class="event-title" :style="{fontSize: aspect === 'event' ? fontSize('title', 75, 40, 60) : fontSize('title', 45, 30, 60)}">
        <span>{{ banner.title | formatString }}</span>
      </div>
      <div class="event-details-wrapper" v-if="aspect !== 'event'">
        <div class="event-details" contenteditable>
          <b-icon icon="calendar-day"/> {{ banner.date | formatDate }}
        </div>
        <div class="event-details" contenteditable>
          <b-icon icon="clock"/> {{ banner.time | formatTime }}
        </div>
        <div class="event-details">
          <b-icon icon="map-marker-alt"/> {{ banner.place }}
        </div>
        <div class="event-details event-details--speakers" v-if="banner.speakers.length > 0 && aspect === '11'">
          <b-icon icon="keynote"/>
          <ul>
            <li v-for="(speaker, i) in banner.speakers" :key="i">
              {{ speaker.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="logo" v-if="aspect !== 'event'">
      <compromis-logo />
      <div :class="{ 'logo-local-label': true, 'logo-local-label--long': banner.localLabel.length > 18 }" v-if="banner.localLabel && banner.hasLocalLabel">
        {{ banner.localLabel | formatLocal }}
      </div>
    </div>
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'

export default {
  name: 'quote-canvas',

  mixins: [CanvasMixin],

  computed: {
    isCrowded: function () {
      return (this.banner.speakers.length > 2 && (this.banner.title.length > 30 || this.banner.place.length > 50)) ||
        this.banner.speakers.length > 4
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .event {
    display: flex;
    position: absolute;
    top: 90px;
    left: 0;
    height: 415px;
    z-index: 40;
    padding: 0 35px;
    width: 260px;
    flex-direction: column;
    justify-content: center;
    z-index: 20;
    transition: all .5s ease-in-out;
    font-family: $family-primary;

    &-title {
      font-size: 40px;
      line-height: 1.1;
      color: $gray-900;
      letter-spacing: -1px;
      display: inline;
      word-wrap: break-word;
      font-family: $family-primary;
      font-weight: bold;
    }

    &-overtitle {
      font-size: 18px;
      letter-spacing: -0.5px;
      color: $gray-700;
      line-height: 1.1;
      padding-bottom: 4px;
    }

    &-details {
      padding-top: 12px;
      display: flex;
      align-content: center;
      font-size: 17.5px;
      letter-spacing: -0.5px;
      color: $gray-700;

      &-wrapper {
        margin-top: 16px;
      }

      .icon {
        padding-right: 5px;
        flex-shrink: 0;

        svg {
          width: 500px;
          height: 500px;
        }
      }

      &--speakers {
        align-items: flex-start;
      }
    }
  }

  .blob {
    &-1 {
      top: -87%;
      left: -74%;
    }

    &-2 {
      left: -60%;
      bottom: -74%;
      z-index: 10;
    }

    &-image {
      top: -5%;
      right: -4%;
      height: 618px;
      z-index: 20;
      width: 414px;
      border-radius: 0;
      border-bottom-left-radius: $border-radius;

      img {
        transform: rotate(-$rotation);
        width: 100%;
        height: 98%;
        margin: 28px -28px;
      }
    }
  }

  .is-crowded {
    .event {
      height: auto;
      top: 100px;
    }
    .blob-2 {
      bottom: -88%;
    }
  }

  // Story aspect
  .aspect-916 {
    .blob {
      &-1 {
        display: none;
      }

      &-2 {
        left: -110%;
        bottom: -94%;
      }

      &-image {
        height: 404px;
        width: 431px;
        top: -23px;
        left: -3px;
        border-bottom-right-radius: 0;

        img {
          margin: 21px -5px;
          width: 98%;
        }
      }
    }

    .event {
      top: 252px;
      width: 100%;
      height: 400px;
      box-sizing: border-box;

      &-overtitle {
        span{
          background: $white;
          padding: 0 10px;
          border-radius: 2px;
          letter-spacing: -1px;
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
        }
      }

      &-title {
        font-size: 34px;
        line-height: 1.42;

        span {
          color: $white;
          padding: 0 10px;
          border-radius: 2px;
          background: $gradient;
          letter-spacing: -1px;
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
        }
      }
    }

    .logo {
      display: none;
    }
  }

  // Event aspect
  .aspect-event {
    .event {
      display: flex;
      align-items: center;
      top: 100px;
      bottom: 100px;
      width: 100%;
      height: auto;
      padding: 0 60px;
      box-sizing: border-box;

      &-title {
        span {
          background: $white;
          color: $gray-900;
          padding: 6px 15px;
          border-radius: 4px;
          line-height: 1.42;
          -webkit-box-decoration-break: clone;
          -webkit-line-break: normal;
          letter-spacing: -0.04em;
        }
      }

      &-overtitle {
        position: absolute;
        color: $white;
        font-size: 22px;
        letter-spacing: -1px;
        font-weight: bold;
        top: -80px;
        left: 30px;
        z-index: 20;
      }
    }

    .blob {
      &-1 {
        top: -149%;
        left: -67%;
        z-index: 20;
        border-bottom-left-radius: 0;
      }

      &-2 {
        left: auto;
        bottom: -146%;
        right: -66%;
        z-index: 20;
        border-top-right-radius: 0;
        --gradient-orientation: -45deg;
      }

      &-image {
        transform: rotate(0);
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        border-radius: 0;

        img {
          transform: rotate(0) scale(1);
          margin: 0;
          height: 100%;
        }
      }
    }
  }

  // Title on top
  .disposition-1 {
    .event {
      left: auto;
      right: 0;
      text-align: right;

      &-details {
        text-align: right;
        justify-content: flex-end;
        .icon {
          order: 1;
          margin-left: 4px;
        }
      }
    }

    .blob-image {
      top: -3%;
      right: 41%;
      height: 550px;
      z-index: 20;
      width: 460px;
      border-radius: 0;
      border-bottom-right-radius: 80px;
    }

    .blob-2 {
      display: none
    }
  }
</style>
