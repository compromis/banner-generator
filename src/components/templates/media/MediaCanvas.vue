<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      aspect === '11' ? 'disposition-' + banner.disposition : '',
      'blobs-' + color
    ]"
    v-if="banner">
    <div class="blob blob-image">
      <img :src="banner.picturePreview" alt="Imatge" v-if="banner.picturePreview" :style="objectPosition" />
    </div>
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="medium">
      <div class="medium-overtitle">
        <span>{{ banner.overtitle | formatString }}</span>
      </div>
      <div class="medium-title" :style="{fontSize: fontSize('title', 60, 40, 30)}">
        <span>{{ banner.title | formatString }}</span>
      </div>
      <div class="medium-subtitle">
        <span>{{ banner.subtitle | formatString }}</span>
      </div>
      <div class="medium-details">
        <div class="medium-day" contenteditable>
          <b-icon icon="calendar-day"/>{{ banner.date | formatDate }}
        </div>
        <div class="medium-time" contenteditable>
          <b-icon icon="clock"/>{{ banner.time | formatTime }}
        </div>
        <div class="medium-broadcast">
          <div v-if="banner.source"
            :class="{
              'medium-channel': true,
              'medium-channel-custom': banner.source === 'other'
            }"
            :style="{
              backgroundColor: banner.source === 'other' ? banner.customSourceColor : banner.source['color'],
              padding: banner.source['padding']
            }">
            <img v-if="banner.source !== 'other'" :src="banner.source.logo" />
            <span v-else>{{ banner.customSource }}</span>
          </div>
          <div v-if="banner.programme || (banner.programme === 'other' && banner.customProgramme)"
            :class="{
              'medium-programme': true,
              'medium-programme-custom': banner.programme === 'other'
            }"
            :style="{
              backgroundColor: banner.programme === 'other' ? banner.customProgrammeColor : banner.programme['color'],
              padding: banner.programme !== 'other' ? banner.programme['padding'] : null,
              width: banner.programme !== 'other' ? banner.programme['width'] : null,
            }">
            <img v-if="banner.programme !== 'other'" :src="banner.programme.logo" />
            <span v-else>{{ banner.customProgramme }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="logo">
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

  mixins: [CanvasMixin]
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .medium {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: 100px;
    left: 0;
    z-index: 40;
    padding: 0 35px;
    width: 265px;
    height: 400px;
    z-index: 20;
    transition: all .5s ease-in-out;
    font-family: $family-primary;

    &-title {
      display: block;
      font-size: 33px;
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
      padding-top: 48px;
      font-size: 18px;
      letter-spacing: -0.5px;
    }

    &-day, &-time {
      display: flex;
      align-content: center;
      padding-top: 12px;
      color: $gray-700;
    }

    &-channel, &-programme {
      display: inline-flex;
      margin: 8px 8px 0 0;
      background-color: $gray-800;
      border-radius: 5px;
      width: 50px;
      height: 50px;
      overflow: hidden;
      box-sizing: border-box;
      flex-shrink: 0;

      &-custom {
        padding: 8px 16px;
        color: $white;
        font-weight: bold;
        width: 170px;
        align-items: center;
        height: auto;
        max-height: 50px;
        line-height: 1.1;
      }
    }

    &-broadcast {
      display: flex;
      flex-wrap: wrap;
      align-items: stretch;
      margin-top: 8px;
    }

    .icon {
      padding-right: 5px;
    }
  }

  .blob {
    &-1 {
      top: -87%;
      left: -74%;
    }

    &-2 {
      left: -63%;
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

    .medium {
      display: flex;
      top: 245px;
      align-content: center;
      width: 100%;
      box-sizing: border-box;

      &-title {
        font-size: 34px;
      }

      &-details {
        padding-top: 24px;
      }

      &-channel-custom, &-programme-custom {
        width: auto;
        flex-grow: 1;
      }

      &-title, &-subtitle, &-overtitle {
        span {
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
          color: white;
          border-radius: 2px;
          background: $gradient;
          letter-spacing: -1px;
          display: inline;
          line-height: 1.42;
          padding: 0 10px;
        }
      }

      &-overtitle,
      &-subtitle {
        span {
          background: $white;
          color: $gray-800;
        }
      }

      &-channel-custom ~ .medium-programme-custom,
      &-channel-custom {
        width: 47%;
      }
    }

    .logo {
      display: none;
    }
  }
</style>
