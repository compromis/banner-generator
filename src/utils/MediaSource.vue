<template>
  <div class="media-source">
    <div v-if="source"
      :class="{
        'media-source-channel': true,
        'media-source-channel-custom': source === 'other'
      }"
      :style="{
        backgroundColor: source === 'other' ? customSourceColor : source['color'],
        padding: source['padding']
      }">
      <img v-if="source !== 'other'" :src="source.logo" />
      <span v-else>{{ customSource }}</span>
    </div>
    <div v-if="programme || (programme === 'other' && customProgramme)"
      :class="{
        'media-source-programme': true,
        'media-source-programme-custom': programme === 'other'
      }"
      :style="{
        backgroundColor: programme === 'other' ? customProgrammeColor : programme['color'],
        padding: programme !== 'other' ? programme['padding'] : null,
        width: programme !== 'other' ? programme['width'] : null,
      }">
      <img v-if="programme !== 'other'" :src="programme.logo" />
      <span v-else>{{ customProgramme }}</span>
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
@import "../sass/variables";

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

</style>
