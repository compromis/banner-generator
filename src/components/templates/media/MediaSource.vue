<template>
  <div class="media-source">
    <div class="channel-wrapper" v-if="source">
      <div
        :class="{
          'media-source-channel': true,
          'media-source-channel-custom': source === 'other'
        }"
        :style="{
          background: source === 'other' ? customSourceColor : source['color'],
          color: source !== 'other' && source['color'] === 'white' ? '#353949' : 'white',
          boxShadow: source['color'] === 'white' && glows ? '0 2px 20px #ccc' : ''
        }">
        <img v-if="source !== 'other'" :src="source.logo" />
        <span v-if="source !== 'other'">{{ source['name'] }}</span>
        <span v-else>{{ customSource }}</span>
      </div>
      <div v-if="glows" class="glowy-ghost first" :style="{ background: source === 'other' ? customSourceColor : source['color'] }"></div>
      <div v-if="glows" class="glowy-ghost second" :style="{ background: source === 'other' ? customSourceColor : source['color'] }"></div>
    </div>
    <div class="programme-wrapper" v-if="programme">
      <div
        :class="{
          'media-source-programme': true,
          'media-source-programme-custom': programme === 'other'
        }"
        :style="{
          background: programme === 'other' ? customProgrammeColor : programme['color'],
          color: programme !== 'other' && programme['color'] === 'white' ? '#353949' : 'white',
          boxShadow: programme['color'] === 'white' && glows ? '0 2px 20px #ccc' : ''
        }">
        <img v-if="programme !== 'other'" :src="programme.logo" :style="{ width: programme['width']}"/>
        <span v-if="programme !== 'other'">{{ programme['name'] }}</span>
        <span v-else>{{ customProgramme }}</span>
      </div>
      <div v-if="glows" class="glowy-ghost first" :style="{ background: programme === 'other' ? customProgrammeColor : programme['color'] }"></div>
      <div v-if="glows" class="glowy-ghost second" :style="{ background: programme === 'other' ? customProgrammeColor : programme['color'] }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MediaSource',

  props: {
    source: {
      type: [Object, String],
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
    programme: {
      type: [Object, String],
      default: null
    },
    customProgramme: {
      type: String,
      default: ''
    },
    customProgrammeColor: {
      type: String,
      default: ''
    },
    glows: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../sass/variables";

.media-source {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;

  &-channel, &-programme {
    display: inline-flex;
    margin: 8px 8px 0 0;
    background-color: $gray-800;
    border-radius: 5px;
    min-width: 150px;
    height: 47px;
    overflow: hidden;
    box-sizing: border-box;
    flex-shrink: 0;
    padding: 8px 16px;
    color: $white;
    font-weight: bold;
    align-items: center;
    line-height: 1.1;

    span {
      margin: 0 8px;
    }
  }

  img {
    width: 42px;
    height: 42px;
  }
}

.aspect-916 {
  .media-source {
    &-channel-custom, &-programme-custom {
      width: auto;
      flex-grow: 1;
    }

    &-channel-custom ~ .media-source-programme-custom,
    &-channel-custom {
      width: 47%;
    }

    &-channel,
    &-programme {
      padding: 0 8px;
    }
  }
}

.channel-wrapper, .programme-wrapper {
  position: relative;
}

.glowy-ghost {
  position: absolute;
  top: 8px;
  left: 0;
  bottom: -2px;
  right: 7px;
  border-radius: 10px;
  filter: blur(6px);
  z-index: -10;
  opacity: .25;

  &.second {
    bottom: 0;
    filter: blur(4px);
    opacity: .35;
  }
}

</style>
