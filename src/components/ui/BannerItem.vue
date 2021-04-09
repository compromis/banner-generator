<template>
  <a class="banner-item">
    <div class="banner-item-thumbnail">
      <img src="" alt="" v-if="banner.thumbnail">
      <b-icon :icon="template.icon" :pack="template.iconPack || 'far'" size="is-large" v-else />
    </div>
    <div class="banner-item-info">
      <div class="banner-title">{{ banner.title }}<b-icon icon="pen" pack="far" /></div>
      <div class="banner-type"><b-icon :icon="template.icon" :pack="template.iconPack || 'far'" />{{ template.name }}</div>
      <div class="banner-saved"><b-icon icon="save" pack="far" />{{ banner.lastSaved }}</div>
    </div>
  </a>
</template>

<script>
export default {
  name: 'banner-item',

  props: {
    banner: {
      type: Object,
      default: null
    }
  },

  computed: {
    template () {
      const { templates } = this.$store.state
      return templates.find(template => template.id === this.banner.type)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";

.banner-item {
  &-thumbnail {
    background: $gray-400;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    height: 180px;
    width: 180px;
    transition: .25s ease-in-out;

    .icon {
      color: $white;
    }
  }

  &-info {
    margin-top: 1rem;

    .banner-title {
      color: $gray-darkest;
      max-width: 180px;
      font-size: 1.2rem;
      margin-bottom: .5rem;
      line-height: 1.3;

      .icon {
        font-size: 1rem;
      }
    }

    .banner-type, .banner-saved {
      display: flex;
      align-items: center;
      font-size: 1rem;
      color: $gray-700;

      .icon {
        font-size: 1.25rem;
        margin-right: .5rem;
      }
    }
  }

  &:hover {
    .banner-item-thumbnail {
      transform: rotate($rotation) scale(1.025);
    }
  }
}
</style>
