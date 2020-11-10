<template>
  <div :class="['banner-frame', `banner-frame--${theme}`]">
    <glowy-blob position="top" :aspect="aspect" v-if="theme === 'blobs'" :color="color" :wide="hashtag.length > 18" />
    <glowy-blob position="bottom" :aspect="aspect" v-if="theme === 'blobs'" :color="color" :wide="localLabel.length > 6" />
    <div class="hashtag" v-if="aspect !== '916'">{{ hashtag }}</div>
    <div :class="['logo', `logo--align-${logoAlign}`]" v-if="aspect === '11'">
      <compromis-logo :mono="!colorLogo" />
      <div :class="{ 'logo-local-label': true, 'logo-local-label--gray': colorLogo, 'logo-local-label--long': localLabel.length > 18 }" v-if="localLabel">
        {{ localLabel | formatLocal  }}
      </div>
    </div>
  </div>
</template>

<script>
import CompromisLogo from '@/components/utils/CompromisLogo'
import GlowyBlob from './GlowyBlob'

export default {
  name: 'BannerFrame',

  components: {
    CompromisLogo,
    GlowyBlob
  },

  props: {
    theme: {
      type: String,
      default: 'blobs',
      validator (value) {
        return ['blobs', 'glowy', 'blobless'].includes(value)
      }
    },
    mode: {
      type: String,
      default: 'white',
      validator (value) {
        return ['white', 'black'].includes(value)
      }
    },
    aspect: {
      type: String,
      default: '11'
    },
    hashtag: {
      type: String,
      default: ''
    },
    localLabel: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'orange'
    },
    logoAlign: {
      type: String,
      default: 'right'
    },
    logo: {
      type: String,
      default: 'auto'
    }
  },

  computed: {
    colorLogo () {
      return (this.theme === 'glowy' && this.mode === 'white') || this.logo === 'color'
    }
  },

  filters: {
    formatLocal (local) {
      return local
        .trim()
        .replace(/^per/gi, '')
        .replace(/#/g, '')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";

.banner-frame {
  .logo {
    display: flex;
    position: absolute;
    align-items: center;
    z-index: 10;
    bottom: 30px;
    color: $white;

    svg {
      height: 30px;
    }

    &--align-right {
      right: 35px;
    }

    &--align-left {
      left: 35px;
    }

    &-local-label {
      margin-left: .75rem;
      font-size: 20px;
      letter-spacing: -.3px;
      line-height: 1;
      white-space: nowrap;

      &--long {
        font-size: .95rem;
        white-space: normal;
        width: 90px;
      }

      &--gray {
        color: $gray-600;
      }
    }
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

    .logo-local-label {
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
