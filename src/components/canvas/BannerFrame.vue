<template>
  <div :class="['banner-frame', `banner-frame--${banner.theme}`]" v-if="!transparentMode">
    <glowy-blob
      v-if="banner.theme === 'blobs'"
      position="top"
      :wide="banner.hashtag.length > 18" />
    <glowy-blob
      v-if="banner.theme === 'blobs'"
      position="bottom"
      :wide="isBottomBlobWide" />
    <div v-if="aspect !== '916'" class="hashtag" >{{ banner.hashtag }}</div>
    <multi-logo :type="logoType" :class="['logo', `logo--align-${logoAlign}`]" v-if="aspect !== '916'" />
  </div>
</template>

<script>
import GlowyBlob from './GlowyBlob'
import MultiLogo from './MultiLogo'

export default {
  name: 'BannerFrame',

  components: {
    MultiLogo,
    GlowyBlob
  },

  props: {
    logoAlign: {
      type: String,
      default: 'right'
    },
    logoType: {
      type: String,
      default: 'auto'
    }
  },

  computed: {
    aspect () {
      return this.$store.state.aspect
    },

    banner () {
      return this.$store.state.banner
    },

    isBottomBlobWide () {
      const { banner, aspect } = this

      return banner.localLabel.length > 6 ||
        (aspect === '169' && banner.localLabel.length > 0) ||
        banner.logo !== 'compromis'
    },

    transparentMode () {
      return this.$store.state.settings.transparentMode
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";

.banner-frame {
  .logo {
    position: absolute;
    bottom: 30px;
  }

  .hashtag {
    position: absolute;
    z-index: 10;
    font-weight: bold;
    font-size: 20px;
    letter-spacing: -.3px;
  }

  &--blobs {
    .hashtag {
      top: 25px;
      left: 35px;
      bottom: auto;
      color: $white;
      z-index: 30;
    }

    .logo {
      z-index: 30;
    }
  }

  &--glowy {
    .hashtag {
      bottom: 30px;
      left: 35px;
    }

    &::v-deep .logo-local-label {
      color: $gray-600;
    }
  }

  &--blobless {
    .hashtag {
      color: $white;
      bottom: 30px;
      left: 35px;
    }
  }
}

</style>
