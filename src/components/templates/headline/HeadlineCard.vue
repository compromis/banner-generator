<template>
  <div :class="{'headline': true, 'headline--pills': pills}">
    <div class="headline-source headline-source--custom" v-if="source === 'other'">
      <span :style="{ color: customSourceColor }">{{ customSource }}</span>
    </div>
    <div class="headline-source" v-else-if="source">
      <img
      :src="source.logo"
      :alt="source.name"
      :style="{ height: source.logoHeight + 'px' }" />
    </div>
    <div class="headline-text"
      :style="{
        fontFamily: source ? source.font.fontFamily : false,
        fontSize,
        letterSpacing: source ? source['letterSpacing'] : false
      }">
      <template v-if="!pills">
        {{ headline }}
      </template>
      <text-in-pills
        v-else
        shadow
        :text="headline"
        :font-size="fontSize"
        :line-height="source.font.lineHeight"
        :padding="source.font.padding"
        :width="720" />
    </div>
  </div>
</template>

<script>
import TextInPills from '@/utils/TextInPills'

export default {
  name: 'HeadlineCard',

  components: {
    TextInPills
  },

  props: {
    source: {
      type: Object,
      default: null
    },
    customSource: {
      type: String,
      default: ''
    },
    customSourceColor: {
      type: String,
      default: ''
    },
    headline: {
      type: String,
      default: ''
    },
    pills: {
      type: Boolean,
      default: true
    },
    fontSize: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../sass/variables";

.headline {
  display: flex;
  position: absolute;
  z-index: 30;
  left: 40px;
  right: 40px;
  bottom: 90px;
  top: auto;
  height: auto;
  padding: 16px;
  background: $white;
  box-shadow: $raised-shadow;
  border-radius: $card-radius;
  font-family: 'Tiempos Headline', serif;
  font-weight: 700;
  transition: all .5s ease-in-out;
  flex-direction: column;
  justify-content: center;

  &-source {
    margin: -26px -26px 0 -26px;
    padding: 20px 26px;

    &--custom {
      margin-bottom: 4px;
      font-size: 22px;
      font-family: Compromis, sans-serif;
    }

    img {
      position: relative;
      top: 3px;
    }
  }

  &-text {
    font-size: 27px;
    line-height: 1.1;
    word-wrap: break-word;
  }

  &--pills {
    background: none;
    box-shadow: none;

    .headline-source img {
      background: $white;
      box-shadow: $raised-shadow;
      border-radius: .5rem;
      padding: 1rem;
    }
  }
}
</style>
