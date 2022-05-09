<template>
  <div
    :id="'bannerCanvas' + aspect"
    class='banner-canvas'
    v-if="banner">
      <div class="picture" v-if="computedPicture" :style="{ backgroundImage: `url(${computedPicture})`, ...backgroundPosition }" />
      <careta class="careta" :logo-style="banner.logoStyle"></careta>
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin'
import Careta from '@/components/canvas/Careta'

export default {
  name: 'social-canvas',

  mixins: [CanvasMixin],

  components: {
    Careta
  },

  computed: {
    computedPicture () {
      return this.banner.pictureBlob || this.banner.picturePreview
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .picture {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: #ddd;
  }

  .careta {
    position: absolute;
    transform: rotate($rotation);
    z-index: 10;
    width: 450px;
    left: 225px;
    top: 225px;
  }

</style>
