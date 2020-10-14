<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      'disposition-' + banner.disposition,
      'banner-background-' + banner.mode
    ]"
    v-if="banner">
    <div class="media-grid">
      <banner-picture
        :picture="banner.picturePreview"
        :picture-position="objectPosition"
        theme="glowy"
        :color="banner.color"
        :edge="true" />
      <div class="medium">
        <span>{{ banner.aspect }}</span>
        <div class="medium-overtitle">
          <span v-if="aspect === '11'">{{ banner.overtitle | formatString }}</span>
          <text-in-pills
            v-else
            :text="banner.overtitle"
            fontSize="20px" />
        </div>
        <div class="medium-title" :style="{fontSize: fontSize(banner.title, 60, 40, 30)}">
          <span v-if="aspect === '11'">{{ banner.title | formatString }}</span>
          <text-in-pills
          v-else
          :text="banner.title"
          :fontSize="fontSize(banner.title, 50, 35, 30)"
          />
        </div>
        <div class="medium-subtitle">
          <span v-if="aspect === '11'">{{ banner.subtitle | formatString }}</span>
          <text-in-pills
          v-else
          :text="banner.subtitle"
          fontSize="20px"
          />
        </div>
        <media-source
          :source="banner.source"
          :custom-cource="banner.customSource"
          :custom-source-color="banner.customSourceColor"
          :programme="banner.programme"
          :custom-programme="banner.customProgramme"
          :custom-programme-color="banner.customProgrammeColor"/>
        <div class="medium-details">
          <event-info color="gradient" icon="calendar-day">{{ banner.date | formatDate }}</event-info>
          <event-info color="gradient" icon="clock">{{ banner.time | formatTime }}</event-info>
        </div>
      </div>
    </div>
    <banner-frame
      theme="glowy"
      :mode="banner.mode"
      :hashtag="banner.hashtag"
      :local-label="banner.localLabel"
      :aspect="aspect" />
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'
import MediaSource from './MediaSource'
import BannerPicture from '@/components/canvas/BannerPicture'
import BannerFrame from '@/components/canvas/BannerFrame'
import EventInfo from '@/components/canvas/EventInfo'
import TextInPills from '@/components/canvas/TextInPills'

export default {
  name: 'quote-canvas',

  mixins: [CanvasMixin],

  components: {
    MediaSource,
    BannerPicture,
    BannerFrame,
    EventInfo,
    TextInPills
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .medium {
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

  .media-grid {
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
    .medium {
      display: flex;
      align-content: center;
      width: 100%;
      margin-top: -105px;
      padding: 20px 20px 0 20px;

      &-details {
        padding-top: 12px;
      }

      &-subtitle {
        margin-top: 6px;
      }
    }
  }

  //Dark background
  .banner-canvas.banner-background-black {
    .event-info, .medium-title {
      color: $white;
    }

    .medium-subtitle, .medium-overtitle {
      color: $gray-400;
    }
  }
</style>
