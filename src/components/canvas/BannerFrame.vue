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
    <div :class="['logo', `logo--align-${logoAlign}`]" v-if="aspect !== '916'">
      <component
        v-if="logoGoes === 'before'"
        :is="logoComponent"
        :mono="!colorLogo"
        :class="[`logo-${banner.logo}`, 'logo-before']" />
      <compromis-logo
        v-if="banner.logo !== 'compromis' && banner.localLabel.length === 0"
        :mono="!colorLogo"
        class="trailing-compromis-logo" />
      <component
        v-if="logoGoes === 'after'"
        :is="logoComponent"
        :mono="!colorLogo"
        :class="[`logo-${banner.logo}`, 'logo-after']" />
      <div
        v-if="banner.localLabel"
        :class="[
          'logo-local-label',
          {
            'logo-local-label--gray': colorLogo,
            'logo-local-label--long': banner.localLabel.length > 18
          }
        ]">
        {{ banner.localLabel | formatLocal }}
      </div>
    </div>
  </div>
</template>

<script>
import CompromisLogo from '@/components/utils/CompromisLogo'
import MesLogo from '@/components/utils/MesLogo'
import IniciativaLogo from '@/components/utils/IniciativaLogo'
import JovespvLogo from '@/components/utils/JovespvLogo'
import VerdsLogo from '@/components/utils/VerdsLogo'
import JovesIniciativaLogo from '@/components/utils/JovesIniciativaLogo'
import DonesLogo from '@/components/utils/DonesLogo'
import GlowyBlob from './GlowyBlob'

export default {
  name: 'BannerFrame',

  components: {
    CompromisLogo,
    MesLogo,
    IniciativaLogo,
    VerdsLogo,
    JovespvLogo,
    JovesIniciativaLogo,
    DonesLogo,
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

    logoComponent () {
      const logos = {
        compromis: CompromisLogo,
        mes: MesLogo,
        iniciativa: IniciativaLogo,
        verds: VerdsLogo,
        jovespv: JovespvLogo,
        jovesiniciativa: JovesIniciativaLogo,
        dones: DonesLogo
      }

      return logos[this.banner.logo]
    },

    logoGoes () {
      const logos = {
        compromis: 'before',
        mes: 'before',
        iniciativa: 'before',
        verds: 'before',
        jovespv: 'before',
        jovesiniciativa: 'before',
        dones: 'after'
      }

      return logos[this.banner.logo]
    },

    colorLogo () {
      return (this.banner.theme === 'glowy' && this.banner.mode === 'white') || this.logoType === 'color'
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

    .trailing-compromis-logo {
      margin-left: 16px;
      height: 25px;
    }

    .logo-bloc {
      height: 20px;
      transform: translateY(-1px);
    }

    .logo-iniciativa {
      height: 35px;
      transform: translateY(-2px);
    }

    .logo-verds {
      height: 22px;
      transform: translateY(1px);
    }

    .logo-jovespv {
      height: 29px;
    }

    .logo-dones {
      height: 25px;
      margin-left: 12px;
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
