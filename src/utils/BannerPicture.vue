<template>
  <div>
    <glowy-card v-if="theme === 'glowy'" :picture="picture" :picture-position="picturePosition" v-bind="$attrs" />
    <div v-else class="background-picture">
      <img v-if="picture" :src="picture" :style="picturePosition" />
    </div>
  </div>
</template>

<script>
import GlowyCard from './GlowyCard'

export default {
  name: 'banner-picture',

  components: {
    GlowyCard
  },

  props: {
    theme: {
      type: String,
      default: 'blobs',
      validator (value) {
        return ['blobs', 'glowy'].indexOf(value) !== -1
      }
    },
    picture: {
      type: [File, String],
      default: null
    },
    picturePosition: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../sass/variables';

  .background-picture {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background: $gray-200;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
