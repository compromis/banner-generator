<template>
  <div :class="{'blobs': true, 'hidden': hidden }" id="scene" ref="scene">
    <div class="blob-holder" data-depth="0.1">
      <div class="blob blob-1"></div>
    </div>
    <div class="blob-holder" data-depth="0.2">
      <div class="blob blob-2"></div>
    </div>
    <div class="blob-holder" data-depth="0.05">
      <div class="blob blob-3"></div>
    </div>
  </div>
</template>

<script>
import Parallax from 'parallax-js'

export default {
  name: 'app-background',

  props: {
    hidden: Boolean
  },

  mounted () {
    const scene = this.$refs.scene
    // eslint-disable-next-line
    const parallaxInstance = new Parallax(scene)
  }
}
</script>

<style lang="scss" scoped>
  @import "../sass/variables";

  .blobs {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    z-index: -1;

    .blob {
      position: absolute;
      border-radius: $border-radius;
      background: linear-gradient(45deg, $gradient-start, $gradient-end);
      width: 50rem;
      height: 50rem;
      animation-name: blob1;
      animation-duration: 20s;
      animation-iteration-count: infinite;
      animation-direction: alternate;
      animation-timing-function: ease-in-out;
      transition: 1s ease-in-out;
      will-change: transform, left, top, right, bottom;

      &-holder {
        width: 100%;
        height: 100%;
      }

      &-1 {
        animation-name: blob1;
        bottom: -30rem;
        right: -30rem;
      }

      &-2 {
        animation-name: blob2;
        top: 40%;
        left: -30rem;
      }

      &-3 {
        animation-name: blob3;
        top: -40rem;
        right: -23rem;
      }
    }
  }

  .hidden {
    .blob {
      &-1 {
        bottom: -60rem;
        right: -60rem;
      }

      &-2 {
        top: -60rem;
        left: -60rem;
      }

      &-3 {
        top: -60rem;
        right: -60rem;
      }
    }
  }

  @media (max-width: $xs-breakpoint) {
    .blob {
      &-2,
      &-3 {
        display: none;
      }
    }
  }

  @media (max-width: 1720px) {
    .route-my-banners .blobs {
      .blob-1 {
        right: -45rem;
      }

      .blob-2 {
        left: -45rem;
      }

      .blob-3 {
        right: -40rem;
      }
    }
  }

  @media (max-width: 1024px) {
    .blobs {
      .blob {
        width: 45rem;
        height: 45rem;

        &-3 {
          top: -38rem;
        }
      }
    }

    .route-my-banners .blobs {
      opacity: 0;
    }
  }

  @media (max-height: 700px) {
    .blobs {
      .blob {
        &-1 {
          bottom: -40rem;
        }
      }
    }
  }

  @keyframes blob1 {
    from {
      transform: translate(-3rem, -3rem) rotate($rotation);
    }

    to {
      transform: translate(0, 0) rotate($rotation);
    }
  }

  @keyframes blob2 {
    from {
      transform: translate(3rem, 3rem) rotate($rotation);
    }

    to {
      transform: translate(0, 0) rotate($rotation);
    }
  }

  @keyframes blob3 {
    from {
      transform: translate(-3rem, 3rem) rotate($rotation);
    }

    to {
      transform: translate(0, 0) rotate($rotation);
    }
  }
</style>
