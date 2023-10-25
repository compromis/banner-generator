<template>
  <div :class="['headline', {'headline--pills': theme === 'glowy', 'headline--dark': mode === 'black'}]">
    <div class="headline-source headline-source--custom" v-if="source === 'other'">
      <span :style="{ color: customSourceColor }">{{ customSource }}</span>
    </div>
    <div class="headline-source" v-else-if="source">
      <img
        :src="mode === 'black' && 'logoCard' in source ? source.logoCard : source.logo"
        :alt="source.name"
        :style="{ height: source.logoHeight + 'px' }" />
    </div>
    <div class="headline-text"
      :style="source && source !== 'other' ? {
        fontFamily: source.font.fontFamily,
        fontSize,
        letterSpacing: source.font['letterSpacing']
      } : { fontSize }">
      <text-in-pills
        v-if="theme === 'glowy'"
        shadow
        :text="headline"
        :font-size="fontSize"
        :line-height="source && source !== 'other' ? source.font.lineHeight : null"
        :padding="source && source !== 'other' ? source.font.padding : '15px 12px 6px'"
        :width="720"
        :pill-style="mode" />
      <template v-else>
        {{ headline }}
      </template>
    </div>
  </div>
</template>

<script>
import TextInPills from '@/components/canvas/TextInPills'

export default {
  name: 'HeadlineCard',

  components: {
    TextInPills
  },

  props: {
    headline: {
      type: String,
      required: true
    },

    fontSize: {
      type: String,
      default: ''
    }
  },

  computed: {
    theme () {
      return this.$store.state.banner.theme
    },

    mode () {
      return this.$store.state.banner.mode
    },

    source () {
      return this.$store.state.banner.source
    },

    customSource () {
      return this.$store.state.banner.customSource
    },

    customSourceColor () {
      return this.$store.state.banner.customSourceColor
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../sass/variables";

.headline {
  display: flex;
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
    margin-bottom: 12px;

    &--custom {
      font-size: 18px;
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

    .headline-source {
      width: fit-content;
      margin-bottom: 22px;
      background: $white;
      box-shadow: $raised-shadow;
      border-radius: 8px;
      padding: 6px 10px;
    }
  }

  // Dark mode
  &--dark {
    &:not(.headline--pills),
    .headline-source {
      background: $gray-900;
      color: $white;
    }

    .headline-source img {
      filter: grayscale(100%) brightness(0) invert(1);
    }
  }
}
</style>
