<template>
  <div class="media-source">
    <div class="channel-wrapper">
      <div v-if="source"
        :class="{
          'media-source-channel': true,
          'media-source-channel-custom': source === 'other'
        }"
        :style="{
          backgroundColor: source === 'other' ? customSourceColor : source['color'],
          color: source['color'] === 'white' ? '#353949' : 'white'
        }">
        <img v-if="source !== 'other'" :src="source.logo" />
        <span v-if="source !== 'other'">{{ source['name'] }}</span>
        <span v-else>{{ customSource }}</span>
      </div>
      <div class="glowy-ghost first" :style="{ background: source === 'other' ? customSourceColor : source['color'] }"></div>
      <div class="glowy-ghost second" :style="{ background: source === 'other' ? customSourceColor : source['color'] }"></div>
    </div>
    <div class="programme-wrapper">
      <div v-if="programme || (programme === 'other' && customProgramme)"
        :class="{
          'media-source-programme': true,
          'media-source-programme-custom': programme === 'other'
        }"
        :style="{
          backgroundColor: programme === 'other' ? customProgrammeColor : programme['color'],
          color: programme['color'] === 'white' ? '#353949' : 'white',
        }">
        <img v-if="programme !== 'other'" :src="programme.logo" :style="{ width: programme['width']}"/>
        <span v-if="programme !== 'other'">{{ programme['name'] }}</span>
        <span v-else>{{ customProgramme }}</span>
      </div>
      <div class="glowy-ghost first" :style="{ background: programme === 'other' ? customProgrammeColor : programme['color'] }"></div>
      <div class="glowy-ghost second" :style="{ background: programme === 'other' ? customProgrammeColor : programme['color'] }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MediaSource',

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
    programme: {
      type: Object,
      default: null
    },
    customProgramme: {
      type: String,
      default: ''
    },
    customProgrammeColor: {
      type: String,
      default: ''
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
  margin-top: 8px;

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
  }
}

.channel-wrapper, .programme-wrapper {
  position: relative;
}

.glowy-ghost {
  position: absolute;
  top: 5px;
  left: 0;
  bottom: 0;
  right: 7px;
  height: 50px;
  border-radius: 10px;
  filter: blur(30px);
  z-index: -10;
  opacity: .6;

  &.second {
    bottom: 0;
    filter: blur(6px) brightness(.85);;
  }
}

</style>
