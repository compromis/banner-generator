<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      'aspect-' + aspect,
      'disposition-' + banner.disposition,
    ]"
    v-if="banner">
    <banner-picture
      :picture="banner.picturePreview"
      :picture-position="objectPosition"
      :theme="theme"
      :edge="true" />
    <div class="medium">
      <span>{{ banner.aspect }}</span>
      <div class="medium-overtitle">
        <span v-if="aspect === '11'">{{ banner.overtitle | formatString }}</span>
        <text-in-pills
        v-else
        :text="banner.overtitle"
        fontSize="20px"
        />
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
      <media-source :source="banner.source" :customSource="banner.customSource" :customSourceColor="banner.customSourceColor" :programme="banner.programme" :customProgramme="banner.customProgramme" :customProgrammeColor="banner.customProgrammeColor"/>
      <div class="medium-details">
        <event-info color="gradient" icon="calendar-day">{{ banner.date | formatDate }}</event-info>
        <event-info color="gradient" icon="clock">{{ banner.time | formatTime }}</event-info>
      </div>
    </div>
    <banner-frame
      theme="glowy"
      :hashtag="banner.hashtag"
      :localLabel="banner.localLabel"
      :aspect="aspect" />
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'
import MediaSource from '@/utils/MediaSource'
import BannerPicture from '@/utils/BannerPicture'
import BannerFrame from '@/utils/BannerFrame'
import EventInfo from '@/utils/EventInfo'
import TextInPills from '@/utils/TextInPills'

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
    position: absolute;
    bottom: 85px;
    left: 0;
    z-index: 40;
    padding: 0 35px;
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

  // Story aspect
  .aspect-916 {
    .medium {
      display: flex;
      bottom: 75px;
      align-content: center;
      width: 100%;
      box-sizing: border-box;

      &-details {
        padding-top: 12px;
      }
    }
  }
</style>
